import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  formId: string;
  placeHolder?: string;
  onTouchValidate?: (value: string) => string | undefined;
};
export function RadioInput(props: Props) {
  return <input type="radio" />;
}
