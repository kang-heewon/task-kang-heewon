import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Error } from "../../components/form/Error";
import { useForm } from "../../contexts/FormContext";

type Props = {
  formId: string;
  placeHolder?: string;
  onTouchValidate?: (value: string) => string | undefined;
};

export function NumberInput({ formId, placeHolder, onTouchValidate }: Props) {
  const { getValue, setValue, setRef, setError } = useForm();
  const [localValue, setLocalValue] = useState(getValue(formId) ?? "");
  const [localError, setLocalError] = useState<string>();
  const handleChange = useCallback((e) => setLocalValue(e.target.value), []);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      setRef(formId, ref);
    }
  }, [formId, setRef]);

  useEffect(() => {
    if (localValue && onTouchValidate) {
      const result = onTouchValidate(localValue);
      if (result) {
        setLocalError(result);
        return;
      }
      setValue(formId, localValue);
    }
  }, [formId, localValue, onTouchValidate, setRef, setValue]);

  useEffect(() => {
    if (localError) {
      setError(formId, Boolean(localError));
    }
  }, [formId, localError, setError, setRef]);

  return (
    <>
      <Box
        type="number"
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
