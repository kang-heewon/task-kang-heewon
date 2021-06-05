import React, { FormEvent, ReactNode, useCallback, useContext, useMemo } from "react";

type FormValue = { [key in string]: string };

function FormService(initialValue: FormValue, handleSubmit: (values: FormValue) => void) {
  const values = { ...initialValue };

  const getValue = (id: string) => {
    return values[id];
  };

  const setValue = (id: string, value: string) => {
    values[id] = value;
  };

  const submit = () => {
    handleSubmit(values);
  };

  return {
    getValue,
    setValue,
    submit,
  };
}

type Props = {
  initialValues: FormValue;
  onSubmit: (values: FormValue) => void;
  children: ReactNode;
};

export const FormContext = React.createContext<ReturnType<typeof FormService>>(null as any);

export function FormProvider({ initialValues, onSubmit, children }: Props) {
  const formService = useMemo(
    () => FormService(initialValues, onSubmit),
    [initialValues, onSubmit]
  );

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formService.submit();
    },
    [formService]
  );
  return (
    <FormContext.Provider value={formService}>
      <form onSubmit={submit}>{children}</form>
    </FormContext.Provider>
  );
}

export const useForm = () => useContext(FormContext);
