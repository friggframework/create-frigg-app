import { createContext, useContext, useState } from "react";

export const IntegrationContext = createContext({});
export const useIntegrationContext = () => useContext(IntegrationContext);
export const IntegrationProvider = ({ children }) => {
  const [integrationId, setIntegrationId] = useState("");
  const [entityId, setEntityId] = useState();
  const [userAction, setUserAction] = useState();
  return (
    <IntegrationContext.Provider
      value={{
        integrationId,
        setIntegrationId,
        entityId,
        setEntityId,
        setUserAction,
        userAction,
      }}
    >
      {children}
    </IntegrationContext.Provider>
  );
};
