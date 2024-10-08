import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Settings } from 'lucide-react';
import Api from '../../api/api';
import QuickActionsMenu from './QuickActionsMenu.jsx';
import { FormBasedAuthModal, IntegrationConfigurationModal } from './modals';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../LoadingSpinner.jsx';
import { useIntegrationContext } from '../../context/IntegrationContext.jsx';

function IntegrationHorizontal(props) {
  const { name, description, icon } = props.data.display;
  const { type, status: initialStatus } = props.data;
  const refreshIntegrations = props.refreshIntegrations;

  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [userActions, setUserActions] = useState([]);
  const { setIntegrationId } = useIntegrationContext();

  const api = new Api();

  useEffect(() => {
    setIntegrationId(props.data.id);
    const userActions = [
      {
        title: 'Get Sample Data',
        action: 'SAMPLE_DATA',
      },
    ];
    Object.keys(props.data.userActions || {}).map((key) => {
      userActions.push({
        title: props.data.userActions[key].title,
        description: props.data.userActions[key].description,
        action: key,
      });
    });
    setUserActions(userActions);
  }, []);

  const getAuthorizeRequirements = async () => {
    setIsProcessing(true);
    api.setJwt(sessionStorage.getItem('jwt'));
    const authorizeData = await api.getAuthorizeRequirements(type, '');
    if (authorizeData.type === 'oauth2') {
      window.location.href = authorizeData.url;
    }
    if (authorizeData.type !== 'oauth2') {
      let data = authorizeData.data;
      for (const element of Object.entries(data.uiSchema)) {
        if (!element['ui:widget']) {
          element['ui:widget'] = 'text';
        }
      }

      openAuthModal();
    }
  };

  function openAuthModal() {
    setIsAuthModalOpen(true);
  }
  function closeAuthModal() {
    setIsAuthModalOpen(false);
    setIsProcessing(false);
  }
  function openConfigModal() {
    setIsConfigModalOpen(true);
  }

  function closeConfigModal() {
    setIsConfigModalOpen(false);
    setIsProcessing(false);
  }

  const disconnectIntegration = async () => {
    const jwt = sessionStorage.getItem('jwt');
    api.setJwt(jwt);
    await api.deleteIntegration(props.data.id);
    setIsProcessing(true);
    setStatus(false);
    await refreshIntegrations(props);
    setIsProcessing(false);
  };
  return (
    <>
      <div
        className="flex flex-nowrap p-4 bg-white rounded-lg shadow-xs"
        data-testid="integration-horizontal"
      >
        <div className="flex flex-1">
          <img
            className="mr-3 w-[80px] h-[80px] rounded-lg"
            alt={name}
            src={icon}
          />
          <div className="pr-1 overflow-hidden">
            <p className="w-full text-lg font-semibold text-gray-700 truncate ...">
              {name}
            </p>
            <p className="pt-2 text-sm font-medium text-gray-600">
              {description}
            </p>
            {status && status === 'NEEDS_CONFIG' && (
              <p className="inline-flex pt-2 text-xs font-medium text-orange-500 gap-1">
                <Settings className="w-4 h-4" /> Configure
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col h-full align-items-end">
            {status ? (
              <>
                <div className="flex-1">
                  <label
                    htmlFor={name}
                    className="flex items-center cursor-pointer"
                  >
                    <Switch name={name} id={name} checked />
                  </label>
                </div>
                <div className="flex flex-row-reverse">
                  <QuickActionsMenu
                    userActions={userActions}
                    integrationConfiguration={openConfigModal}
                    disconnectIntegration={disconnectIntegration}
                  />
                </div>
              </>
            ) : (
              <Button onClick={getAuthorizeRequirements}>
                {isProcessing ? <LoadingSpinner /> : 'Connect'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {isAuthModalOpen ? (
        <FormBasedAuthModal
          isAuthModalOpen={isAuthModalOpen}
          closeAuthModal={closeAuthModal}
          refreshIntegrations={refreshIntegrations}
          name={name}
          type={type}
        ></FormBasedAuthModal>
      ) : null}

      {isConfigModalOpen ? (
        <IntegrationConfigurationModal
          isConfigModalOpen={isConfigModalOpen}
          closeConfigModal={closeConfigModal}
          name={name}
          refreshIntegrations={() => refreshIntegrations(props)}
          integrationId={props.data.id}
        ></IntegrationConfigurationModal>
      ) : null}
    </>
  );
}
function mapStateToProps({ auth, integrations }) {
  console.log(`integrations: ${JSON.stringify(integrations)}`);
  return {
    authToken: auth.token,
    integrations,
  };
}

export default IntegrationHorizontal;
