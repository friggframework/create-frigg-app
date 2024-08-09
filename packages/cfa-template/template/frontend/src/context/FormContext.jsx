import React, { createContext, useContext, useState } from "react";

const FormContext = createContext({});

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formType, setFormType] = useState();

  return (
    <FormContext.Provider
      value={{
        formType,
        setFormType,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
