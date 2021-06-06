import React, { FormEvent, ReactNode, RefObject, useCallback, useContext, useMemo } from "react";

type FormValue = { [key in string]: string };
type FormError = { [key in string]: RefObject<HTMLElement> };

function FormService(initialValue: FormValue, handleSubmit: (values: FormValue) => void) {
  const values = { ...initialValue };
  const errors: FormError = {};

  const getValue = (id: string) => {
    return values[id];
  };

  const setValue = (id: string, value: string) => {
    values[id] = value;
  };

  const setErrorRef = (id: string, ref: RefObject<HTMLElement>) => {
    errors[id] = ref;
  };

  const submit = () => {
    if (!errors) {
      handleSubmit(values);
      return;
    }

    const topRef = Object.keys(errors).reduce((prevKey, key) => {
      const targetOffsetTop = errors[key].current?.offsetTop ?? 0;
      const prevOffsetTop = errors[prevKey].current?.offsetTop ?? 0;
      return prevOffsetTop > targetOffsetTop ? key : prevKey;
    });
    if (topRef) {
      errors[topRef].current?.focus();
    }
  };

  return {
    getValue,
    setValue,
    setErrorRef,
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
