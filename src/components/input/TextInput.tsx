import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Error } from "../../components/form/Error";
import { useForm } from "../../contexts/FormContext";

type Props = {
  formId: string;
  placeHolder?: string;
  onTouchValidate?: (value: string) => string | undefined;
};

export function TextInput({ formId, placeHolder, onTouchValidate }: Props) {
  const { getValue, setValue, setErrorRef } = useForm();
  const [localValue, setLocalValue] = useState(getValue(formId) ?? "");
  const [localError, setLocalError] = useState<string>();
  const handleChange = useCallback((e) => setLocalValue(e.target.value), []);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localValue && onTouchValidate) {
      const result = onTouchValidate(localValue);
      setLocalError(result);
      setValue(formId, localValue);
      setErrorRef(formId, result ? ref : null);
    }
  }, [formId, localValue, onTouchValidate, setErrorRef, setValue]);

  return (
    <>
      <Box
        ref={ref}
        onChange={handleChange}
        value={localValue}
        placeholder={placeHolder}
        error={Boolean(localError)}
      />
      {localError && <Error>{localError}</Error>}
    </>
  );
}

const Box = styled.input<{ error: boolean }>`
  width: 100%;
  border: solid ${({ error }) => (error ? "2px #F78000" : "1px #ced4da")};
  appearance: none;
  outline: none;
  height: 40px;
  margin-top: 0;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 14px;

  :focus {
    border: 1px solid ${({ error }) => (error ? "#F78000" : "#2b96ed")};
    box-shadow: inset 0 0 0 1px ${({ error }) => (error ? "#F78000" : "#51abf3")};
  }
  ::placeholder {
    color: #adb5bd;
  }
`;
