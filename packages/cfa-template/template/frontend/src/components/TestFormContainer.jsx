import * as React from 'react';
import { useEffect } from 'react';
import { FetchOptionsBasedOnAutoComplete } from './FetchOptionsBasedOnAutoComplete.jsx';
import { useApplicationContext } from '../context/ApplicationContext.jsx';
import { useIntegrationContext } from '../context/IntegrationContext.jsx';

const TestFormContainer = (props) => {
  const { setIntegrationId, setActionId, setEntityId } =
    useIntegrationContext();

  useEffect(() => {
    setIntegrationId(props.match.params.integrationId);
    setActionId('COMPANY_SEARCH');
    setEntityId('123');
  }, []);

  return (
    <div>
      <FetchOptionsBasedOnAutoComplete />
    </div>
  );
};

export default TestFormContainer;
