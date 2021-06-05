import React from "react";
import { TextInput } from "../components/input/TextInput";
import { FormProvider } from "../contexts/FormContext";

export function Index() {
  return (
    <FormProvider initialValues={{ name: "helo" }} onSubmit={(values) => console.log(values)}>
      <div>
        <TextInput formId="name" />
        <TextInput formId="hello" />
        <TextInput formId="bye" />
        <button type="submit">서브밋</button>
      </div>
    </FormProvider>
  );
}
