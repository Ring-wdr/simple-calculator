export const operators = ["+", "-", "/", "*"] as const;
type OperatorType = (typeof operators)[number];
const isOperatorType = (str: string): str is OperatorType =>
  operators.some((op) => op === str);
type CalculatorState = {
  numbers: number[];
  operator: OperatorType[];
  current: string;
  errorState?: {
    name: string;
    message: string;
  };
};

export const initState: CalculatorState = {
  numbers: [],
  operator: [],
  current: "0",
};

export type TypeNotNeedPayloadCalculate = "REFRESH" | "EXECUTE" | "DELETE";

type TypeNeedPayloadCalculate = "ADD_DIGIT" | "OPERATOR";

export type CalculateAction =
  | {
      type: TypeNotNeedPayloadCalculate;
    }
  | {
      type: TypeNeedPayloadCalculate;
      payload: string;
    };

export const calculateReducer = (
  state: CalculatorState,
  action: CalculateAction
): CalculatorState => {
  const { numbers, operator, current } = state;

  switch (action.type) {
    case "REFRESH":
      return initState;
    case "EXECUTE":
      try {
        return {
          ...initState,
          current: executeCalculate(state),
        };
      } catch (e) {
        if (e instanceof Error) {
          return {
            ...initState,
            errorState: {
              message: e.message,
              name: e.name,
            },
          };
        }
        return {
          ...initState,
          errorState: {
            message: "unexpected error",
            name: "error",
          },
        };
      }
    case "DELETE":
      if (current.length === 0) {
        if (numbers.length === 0) return state;
        if (numbers.length === operator.length)
          return {
            ...state,
            operator: operator.slice(0, -1),
            current: operator[operator.length - 1],
          };

        return {
          ...state,
          numbers: numbers.slice(0, -1),
          current: String(numbers[numbers.length - 1]),
        };
      }
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    case "OPERATOR":
      return {
        ...state,
        current: action.payload,
        ...(!isOperatorType(current) && {
          numbers: [...numbers, Number(current)],
        }),
      };

    case "ADD_DIGIT":
      if (isOperatorType(current)) {
        return {
          ...state,
          operator: [...state.operator, current],
          current: action.payload,
        };
      }
      if (
        (action.payload === "0" && current === "0") ||
        (action.payload === "." && current.includes("."))
      )
        return state;
      if (action.payload !== "0" && action.payload !== "." && current === "0") {
        return {
          ...state,
          current: action.payload,
        };
      }
      return {
        ...state,
        current: `${current}${action.payload}`,
      };
    default:
      throw new Error("exact type input need");
  }
};

function executeCalculate({ numbers, operator, current }: CalculatorState) {
  if (numbers.length === 0) return current;
  const currentNumbers = numbers.slice();
  if (!isOperatorType(current)) currentNumbers.push(Number(current));
  const currentOperators =
    currentNumbers.length === operator.length
      ? operator.slice(0, -1)
      : operator.slice();

  const result = currentOperators.reduce<number>((acc, operator, idx) => {
    const nextNumber = currentNumbers[idx + 1];
    switch (operator) {
      case "+":
        return acc + nextNumber;
      case "-":
        return acc - nextNumber;
      case "*":
        return acc * nextNumber;
      case "/":
        if (nextNumber === 0) throw new Error("0 divide error!!");
        return acc / nextNumber;
    }
  }, currentNumbers[0]);
  return String(result);
}
