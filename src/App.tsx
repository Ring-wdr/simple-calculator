import { useState } from "react";
import "./App.css";
import Calculator, { CalculatorProps } from "./components/calculator";
import Portal from "./components/portal";
import { Button } from "./components";
import Local from "./components/Local";

const buttonContents = [
  { name: "AC", value: "REFRESH", colspan: 2 },
  { name: "DEL", value: "DELETE" },
  { name: "÷", value: "/" },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "×", value: "*" },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "+", value: "+" },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "-", value: "-" },
  { name: ".", value: "." },
  { name: "0", value: 0 },
  { name: "=", value: "EXECUTE", colspan: 2 },
] satisfies CalculatorProps["buttonsData"];

function App() {
  const [err, setErr] = useState<Error | null>(null);
  const [tab, setTab] = useState<"calculator" | "store">("calculator");
  return (
    <div className="content">
      <div>{tab.toUpperCase()}</div>
      <input
        type="radio"
        name="tab"
        value={"calculator"}
        onChange={() => setTab("calculator")}
      />
      <input
        type="radio"
        name="tab"
        value={"store"}
        onChange={() => setTab("store")}
      />
      {tab === "calculator" ? (
        <Calculator buttonsData={buttonContents} dispatchError={setErr} />
      ) : (
        <Local />
      )}
      {err && (
        <Portal>
          <div>
            {err?.message}
            에러가 났다고 하네요~
            <Button onClick={() => setErr(null)}>확인</Button>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default App;
