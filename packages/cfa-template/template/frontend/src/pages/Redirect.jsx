import React from 'react';
import { RedirectFromAuth } from '@friggframework/ui';
import { useNavigate, useParams } from 'react-router-dom';

const Redirect = () => {
  const { app } = useParams();
  const navigate = useNavigate();

  const redirectToUrl = () => {
    navigate('/integrations');
  };

  return (
    <RedirectFromAuth
      friggBaseUrl={process.env.REACT_APP_API_BASE_URL}
      authToken={sessionStorage.getItem('jwt')}
      app={app}
      redirectToUrl={redirectToUrl}
      primaryEntityName={app} // TODO: find more robust way to match primary entity name
    />
  );
};

export default Redirect;
