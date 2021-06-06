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
  const { getValue, setValue, setRef, setError, setValidator } = useForm();
  const [localValue, setLocalValue] = useState(getValue(formId) ?? "");
  const [localError, setLocalError] = useState<string>();
  const handleChange = useCallback((e) => setLocalValue(e.target.value), []);
  const ref = useRef<HTMLInputElement>(null);
  const handleValidate = useCallback(() => {
    if (onTouchValidate) {
      const result = onTouchValidate(localValue);
      setLocalError(result);
      return Boolean(result);
    }
    return false;
  }, [localValue, onTouchValidate]);

  useEffect(() => {
    if (ref.current) {
      setRef(formId, ref);
    }
    if (handleValidate) {
      setValidator(formId, handleValidate);
    }
  }, [formId, handleValidate, onTouchValidate, setRef, setValidator]);

  useEffect(() => {
    if (localValue && onTouchValidate) {
      handleValidate();
      setValue(formId, localValue);
    }
  }, [formId, handleValidate, localValue, onTouchValidate, setRef, setValue]);

  useEffect(() => {
    if (localError) {
      setError(formId, Boolean(localError));
    }
  }, [formId, localError, setError, setRef]);

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
