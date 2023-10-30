import { ButtonHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./index.module.css";

type ButtonProps = {
  variant?: "small" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "large",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classnames(variant, styles.button, className)}
      {...props}
    />
  );
}
