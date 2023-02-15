import React, { useEffect } from "react";
// @ts-ignore
import Quagga from "quagga";

function Scanner(props: any) {
  const onDetected = (result: object) => {
    Quagga.stop();
    props.onDetected(result);
  };

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // or user
          },
        },
        locator: {
          halfSample: true,
          patchSize: "large", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: true,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true,
            },
          },
        },
        numOfWorkers: 4,
        decoder: {
          readers: ["code_128_reader"],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
          },
        },
        locate: true,
      },
      function (err: string) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((res: object) => onDetected(res));
  }, []);

  return <div id="interactive" className="viewport" />;
}

export default Scanner;
