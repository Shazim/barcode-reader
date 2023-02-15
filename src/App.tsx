import React, { useState } from "react";
// @ts-ignore
import Scanner from "./component/Scanner";

function App() {
  const [state, setState] = useState(false);
  const [resultCode, setResultCode] = useState("");

  const scan = () => {
    setState(!state);
  };

  const onDetected = (result: any) => {
    setResultCode(result?.codeResult?.code);
    setState(!state);
  };

  return (
    <div className="App">
      <div className="text-center pt-10 font-bold text-5xl">
        Bar Code Reader
      </div>
      {!state && (
        <div>
          <button onClick={() => scan()} className="w-40 btn-scanner">
            Open Scanner
          </button>
        </div>
      )}

      {state ? (
        <div className="flex justify-center mt-20 ">
          <Scanner onDetected={(result: boolean) => onDetected(result)} />
        </div>
      ) : (
        <div className="flex justify-center font-bold text-4xl mt-7">
          {resultCode}
        </div>
      )}
    </div>
  );
}

export default App;
