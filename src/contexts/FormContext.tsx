import React, { FormEvent, ReactNode, RefObject, useCallback, useContext, useMemo } from "react";

type FormValue = {
  [key in string]: {
    value?: string;
    ref?: RefObject<HTMLElement>;
    error?: boolean;
    validator?: (value: string) => boolean;
  };
};

function FormService(handleSubmit: (values: FormValue) => void, initialValue?: FormValue) {
  const values: FormValue = { ...initialValue };

  const getValue = (id: string) => {
    return values[id]?.value;
  };

  const setValue = (id: string, value: string) => {
    values[id] = { ...values[id], value };
  };

  const setRef = (id: string, ref: RefObject<HTMLElement>) => {
    values[id] = { ...values[id], ref };
  };
  const setError = (id: string, error: boolean) => {
    values[id] = { ...values[id], error };
  };

  const setValidator = (id: string, validator: (value: string) => boolean) => {
    values[id] = { ...values[id], validator };
  };

  const validate = (keyList: string[]) =>
    new Promise(() => {
      keyList.forEach((key) => values[key].validator?.(values[key].value ?? ""));
    });

  const getErrors = (keyList: string[]): Promise<string> =>
    new Promise(() =>
      keyList.reduce((prevKey, key) => {
        const targetOffsetTop = values[key].ref?.current?.offsetTop;
        const prevOffsetTop = values[prevKey].ref?.current?.offsetTop;

        if (!values[key].error || !targetOffsetTop) {
          return prevKey;
        }

        if (!values[prevKey].error || !prevOffsetTop) {
          return key;
        }
        return prevOffsetTop > targetOffsetTop ? key : prevKey;
      })
    );

  const submit = async () => {
    const keyList = Object.keys(values);
    await validate(keyList);
    const errorKey = await getErrors(keyList);

    if (errorKey) {
      values[errorKey]?.ref?.current?.focus();
      return;
    }
    handleSubmit(values);
  };

  return {
    getValue,
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
