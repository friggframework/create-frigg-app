import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import AppRouter from './AppRouter.jsx';
import Auth from './components/Auth.jsx';
import history from './utils/history';
import {
  ApplicationProvider,
  FormProvider,
  IntegrationProvider,
} from './context';
import { Toaster } from './components/ui/toaster';

const App = ({ authToken }) => {
  const loggedIn = authToken || sessionStorage.getItem('jwt');

  return (
    <div className={loggedIn ? 'flex h-screen bg-gray-50' : 'bg-gray-50'}>
      <ApplicationProvider>
        <IntegrationProvider>
          <FormProvider>
            <Toaster position="top-right" />
            <Router history={history}>
              {loggedIn ? <AppRouter /> : <Auth />}
            </Router>
          </FormProvider>
        </IntegrationProvider>
      </ApplicationProvider>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ authToken: auth.token });

export default connect(mapStateToProps)(App);
