import React, { createContext, useContext, useState } from "react";

const ApplicationContext = createContext({});

export const useApplicationContext = () => useContext(ApplicationContext);

/**
 * todo: Can be used to store information like user, token?, integrations, etc... stuff currently stored in localStorage. Could be populated from local storage
 */
export const ApplicationProvider = ({ children }) => {
  return (
    <ApplicationContext.Provider value={{}}>
      {children}
    </ApplicationContext.Provider>
  );
};
