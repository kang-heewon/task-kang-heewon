import React, { useEffect, useState } from "react";
import { useForm } from "../../contexts/FormContext";

type Props = { formId: string };
export function TextInput({ formId }: Props) {
  const { setValue } = useForm();
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    setValue(formId, localValue);
  }, [formId, localValue, setValue]);

  return <input onChange={(e) => setLocalValue(e.target.value)} value={localValue} />;
}
