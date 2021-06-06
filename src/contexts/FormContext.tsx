import React, { FormEvent, ReactNode, RefObject, useCallback, useContext, useMemo } from "react";

type FormValue = {
  [key in string]: {
    value?: any;
    ref?: RefObject<HTMLElement>;
    error?: boolean;
    validator?: (value: any) => boolean;
  };
};

function FormService(handleSubmit: (values: FormValue) => void, initialValue?: FormValue) {
  const values: FormValue = { ...initialValue };

  const getValue = (id: string) => {
    return values[id]?.value;
  };
  const getValueObject = (id: string) => {
    return values[id];
  };

  const setValue = (id: string, value: any) => {
    values[id] = { ...values[id], value };
  };

  const setRef = (id: string, ref: RefObject<HTMLElement>) => {
    values[id] = { ...values[id], ref };
  };
  const setError = (id: string, error: boolean) => {
    values[id] = { ...values[id], error };
  };

  const setValidator = (id: string, validator: (value: any) => boolean) => {
    values[id] = { ...values[id], validator };
  };

  const validate = (keyList: string[]) =>
    new Promise((resolve) => {
      for (const key of keyList) {
        values[key].error = values[key].validator?.(values[key].value ?? "");
      }
      resolve(keyList.some((key) => values[key].error));
    });

  const getErrors = (keyList: string[]): string =>
    keyList
      .filter((key) => values[key].error)
      .reduce((prevKey, key) => {
        const targetOffsetTop = values[key].ref?.current?.offsetTop;
        const prevOffsetTop = values[prevKey].ref?.current?.offsetTop;
        console.log(key, prevOffsetTop, targetOffsetTop);

        if (!targetOffsetTop) {
          return prevKey;
        }

        if (!prevOffsetTop) {
          return key;
        }
        return prevOffsetTop > targetOffsetTop ? key : prevKey;
      });

  const submit = async () => {
    const keyList = Object.keys(values);
    const hasError = await validate(keyList);
    if (hasError) {
      const errorKey = getErrors(keyList);
      console.log(errorKey);
      if (errorKey) {
        values[errorKey]?.ref?.current?.scrollIntoView();
        window.scrollBy(0, -100);
        values[errorKey]?.ref?.current?.focus();
        return;
      }
    }

    handleSubmit(values);
  };

  return {
    values,
    getValue,
    getValueObject,
    setValue,
    setError,
    setValidator,
    setRef,
    submit,
  };
}

type Props = {
  initialValues?: FormValue;
  onSubmit: (values: FormValue) => void;
  children: ReactNode;
};

export const FormContext = React.createContext<ReturnType<typeof FormService>>(null as any);

export function FormProvider({ initialValues, onSubmit, children }: Props) {
  const formService = useMemo(
    () => FormService(onSubmit, initialValues),
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
