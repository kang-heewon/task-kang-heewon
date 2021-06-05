import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useForm } from "../../contexts/FormContext";

type Props = { formId: string; placeHolder?: string };

export function TextInput({ formId, placeHolder }: Props) {
  const { getValue, setValue } = useForm();
  const [localValue, setLocalValue] = useState(getValue(formId) ?? "");

  useEffect(() => {
    setValue(formId, localValue);
  }, [formId, localValue, setValue]);

  return (
    <Box
      onChange={(e) => setLocalValue(e.target.value)}
      value={localValue}
      placeholder={placeHolder}
    />
  );
}

const Box = styled.input`
  width: 100%;
  border: solid 1px #ced4da;
  appearance: none;
  outline: none;
  height: 40px;
  margin-top: 0;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 14px;

  :focus {
    border: 1px solid #2b96ed;
    box-shadow: inset 0 0 0 1px #51abf3;
  }
  ::placeholder {
    color: #adb5bd;
  }
`;
