import React, { useState } from 'react';
import { IntegrationList } from '@friggframework/ui';
import config from '../frigg.config';
import { useApplicationContext } from '../context/ApplicationContext.jsx';
import { useNavigate } from 'react-router-dom';

function IntegrationsPage() {
  const { token } = useApplicationContext();
  const navigate = useNavigate();
  const [integrationType, setIntegrationType] = useState('Recently added');

  const categories = [
    { _id: 1, slug: 'recently-added', name: 'Recently added' },
    { _id: 2, slug: 'marketing', name: 'Marketing' },
    { _id: 3, slug: 'sales-and-crm', name: 'Sales & CRM' },
    { _id: 4, slug: 'commerce', name: 'Commerce' },
    { _id: 5, slug: 'social', name: 'Social' },
    { _id: 6, slug: 'productivity', name: 'Productivity' },
    { _id: 7, slug: 'finance', name: 'Finance' },
    { _id: 8, slug: 'installed', name: 'Installed' },
  ];

  const filterIntegration = (type) => {
    setIntegrationType(type);
  };

  const navigateToSampleData = (integrationId) => {
    console.log('navigating to sample data for integration ID:', integrationId);
    navigate(`/data/${integrationId}`);
  };

  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700">
          Integrations
        </h2>
        <div className="grid mb-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ul className="col-span-1 pl-10 xs:inline-flex">
            {categories.map((category) => (
              <li
                key={category._id}
                className="mb-4 text-lg font-semibold text-gray-600 cursor-pointer mr-2 sm:inline md:block"
                onClick={() => {
                  filterIntegration(category.name);
                }}
              >
                <span
                  className={
                    integrationType === category.name
                      ? 'border-b-4 border-primary'
                      : ''
                  }
                >
                  {category.name}
                </span>
              </li>
            ))}
          </ul>
          <div className="grid gap-6 lg:col-span-1 lg:grid-cols-1 xl:col-span-2 xl:grid-cols-2 2xl:col-span-3 2xl:grid-cols-3 2xl:grid-rows-6">
            <IntegrationList
              integrationType={integrationType}
              friggBaseUrl={process.env.REACT_APP_API_BASE_URL}
              componentLayout={config.componentLayout}
              authToken={token}
              navigateToSampleDataFn={navigateToSampleData}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default IntegrationsPage;
