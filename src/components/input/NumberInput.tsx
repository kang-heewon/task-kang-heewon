import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;
export function NumberInput(props: Props) {
  return <input type="number" {...props} />;
}
