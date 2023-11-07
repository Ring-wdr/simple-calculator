import { CSSProperties } from "react";
import { RegisterOptions } from "react-hook-form";

export const nameValidate: RegisterOptions<SubmitFormState, "name"> = {
  required: true,
  minLength: 3,
  maxLength: 8,
};

export const phoneValidate: RegisterOptions<SubmitFormState, "phone"> = {
  required: true,
  pattern: /[0-9]{11}/,
};

export const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  gap: 2,
};
