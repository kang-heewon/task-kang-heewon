import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Error } from "../../components/form/Error";
import { useForm } from "../../contexts/FormContext";
import { HStack } from "../layout/HStack";
import { VStack } from "../layout/VStack";

type Props = {
  formId: string;
  onTouchValidate?: (value: string) => string | undefined;
  items: { label: string; value: string }[];
  flex?: number;
};
export function RadioInput({ formId, onTouchValidate, items, flex }: Props) {
  const { getValue, setValue, setRef, setError, setValidator } = useForm();
  const [localValue, setLocalValue] = useState(getValue(formId) ?? "");
  const [localError, setLocalError] = useState<string>();
  const handleChange = useCallback((value) => () => setLocalValue(value), []);
  const ref = useRef<HTMLDivElement>(null);
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
    if (localValue) {
      handleValidate();
      setValue(formId, localValue);
    }
  }, [formId, handleValidate, localValue, setRef, setValue]);

  useEffect(() => {
    setError(formId, Boolean(localError));
  }, [formId, localError, setError, setRef]);

  return (
    <VStack spacing={4} width="100%" flex={flex}>
      <Box ref={ref}>
        <HStack width="100%" spacing="between">
          {items.map((item, index) => (
            <HStack key={item.value} width="100%">
              {index !== 0 && <Divider />}
              <Option selected={localValue === item.value} onClick={handleChange(item.value)}>
                {item.label}
              </Option>
            </HStack>
          ))}
        </HStack>
      </Box>
      {localError && <Error>{localError}</Error>}
    </VStack>
  );
}

const Box = styled.div`
  width: 100%;
  border: solid 1px #ced4da;
  height: 40px;
  margin-top: 0;
  border-radius: 4px;
  font-size: 14px;
`;

const Option = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 12px;
  text-align: center;
  ${({ selected }) =>
    selected &&
    `background-color: #2b96ed;
    color: white;
  `}
`;

const Divider = styled.div`
  width: 1px;
  background-color: #ced4da;
`;
