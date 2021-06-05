import React, { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;
export function SelectInput(props: Props) {
  return <select {...props} />;
}
