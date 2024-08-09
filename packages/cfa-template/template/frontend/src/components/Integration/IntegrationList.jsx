import React, { useEffect, useState } from 'react';
import { IntegrationHorizontal, IntegrationVertical } from '@friggframework/ui';
import IntegrationSkeleton from './IntegrationSkeleton';
import IntegrationUtils from '../../utils/IntegrationUtils';
import API from '../../api/api';
import config from '../../frigg.config';

/**
 *
 * @param props.integrationType - Type of integration to filter by
 * @param props.friggBaseUrl - Base URL for Frigg backend
 * @returns {Element}
 * @constructor
 */
const IntegrationList = (props) => {
  const [installedIntegrations, setInstalledIntegrations] = useState([]);
  const [integrations, setIntegrations] = useState({});

  const refreshIntegrations = async () => {
    const api = new API(props.friggBaseUrl);
    const jwt = sessionStorage.getItem('jwt');
    api.setJwt(jwt);

    const integrationsData = await api.listIntegrations();

    if (integrationsData.error) {
      // dispatch(logoutUser());
      //todo: if integration has an error, we should display an error message + a way to solve it
    }

    setIntegrations(integrationsData);
  };

  useEffect(() => {
    const init = async () => {
      const jwt = sessionStorage.getItem('jwt');

      //todo: should we check if token is expired here?

      if (jwt) {
        await refreshIntegrations();
      }
    };

    init();
  }, []);

  const setInstalled = (data) => {
    const items = [data, ...installedIntegrations];
    setInstalledIntegrations(items);
  };

  const integrationComponent = (integration) => {
    if (config.componentLayout === 'default-horizontal') {
      return (
        <IntegrationHorizontal
          data={integration}
          key={`combined-integration-${integration.type}`}
          handleInstall={setInstalled}
          refreshIntegrations={refreshIntegrations}
          friggBaseUrl={props.friggBaseUrl}
        />
      );
    }
    if (config.componentLayout === 'default-vertical') {
      return (
        <IntegrationVertical
          data={integration}
          key={`combined-integration-${integration.type}`}
          handleInstall={setInstalled}
          refreshIntegrations={refreshIntegrations}
          friggBaseUrl={props.friggBaseUrl}
        />
      );
    }
  };

  const renderCombinedIntegrations = (combinedIntegrations) => {
    if (props.integrationType === 'Recently added') {
      return combinedIntegrations.map((integration) =>
        integrationComponent(integration)
      );
    }
    if (props.integrationType === 'Installed') {
      return installedIntegrations.map((integration) =>
        integrationComponent(integration)
      );
    }
    return combinedIntegrations
      .filter(
        (integration) =>
          integration.display.description === props.integrationType
      )
      .map((integration) => integrationComponent(integration));
  };

  let integrationUtils = null;
  let displayedIntegrations = [];

  if (integrations) {
    integrationUtils = new IntegrationUtils(integrations.integrations);
  }

  if (integrationUtils) {
    displayedIntegrations = renderCombinedIntegrations(
      integrationUtils.getActiveAndPossibleIntegrationsCombined()
    );
  }

  return (
    <>
      {integrationUtils !== null ? (
        displayedIntegrations
      ) : (
        <div className="grid gap-6 lg:col-span-1 lg:grid-cols-1 xl:col-span-2 xl:grid-cols-2 2xl:col-span-3 2xl:grid-cols-3">
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
          <IntegrationSkeleton layout={config.componentLayout} />
        </div>
      )}
      {integrationUtils !== null && displayedIntegrations.length === 0 && (
        <p>No {props.integrationType} integrations found.</p>
      )}
    </>
  );
};

export default IntegrationList;
