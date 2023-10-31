import { useEffect, useReducer } from "react";
import classnames from "classnames";
import { Button } from "..";
import {
  TypeNotNeedPayloadCalculate,
  calculateReducer,
  initState,
  operators,
} from "./reducer";
import styles from "./index.module.scss";

export type CalculatorProps = {
  buttonsData: {
    name: string;
    value: string | number;
    colspan?: number;
    rowspan?: number;
  }[];
  dispatchError?: React.Dispatch<React.SetStateAction<Error | null>>;
} & React.PropsWithChildren &
  React.HTMLAttributes<HTMLDivElement>;

export default function Calculator({
  buttonsData,
  className,
  children,
  dispatchError,
  ...props
}: CalculatorProps) {
  const [{ numbers, operator, current, errorState }, dispatch] = useReducer(
    calculateReducer,
    initState
  );

  const prevInputs = numbers
    .reduce<string[]>(
      (result, num, idx) =>
        operator[idx]
          ? [...result, String(num), operator[idx]]
          : [...result, String(num)],
      []
    )
    .join(" ");
  const controlCaculator = (value: number | string) => () => {
    typeof value === "number" || value === "."
      ? dispatch({ type: "ADD_DIGIT", payload: String(value) })
      : operators.some((op) => op === value)
      ? dispatch({ type: "OPERATOR", payload: value })
      : dispatch({ type: value as TypeNotNeedPayloadCalculate });
  };

  useEffect(() => {
    errorState && dispatchError && dispatchError(errorState);
    return () => dispatchError && dispatchError(null);
  }, [errorState, dispatchError]);

  return (
    <div
      className={classnames(styles["calculator-grid"], className)}
      {...props}
    >
      <div className={styles.output}>
        {prevInputs} {current}
      </div>
      {buttonsData.map(({ name, value, colspan, rowspan }, idx) => (
        <Button
          key={idx}
          className={classnames(
            { [styles.colspan]: colspan },
            { [styles.rowspan]: rowspan }
          )}
          data-colspan={colspan}
          data-rowspan={rowspan}
          onClick={controlCaculator(value)}
        >
          {name}
        </Button>
      ))}
      {children}
    </div>
  );
}
