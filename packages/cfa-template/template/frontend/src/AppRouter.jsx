import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Data from './components/Data';
import Logout from './components/Logout';
import IntegrationsPage from './pages/IntegrationsPage';
import SettingsPage from './pages/SettingsPage';
import { RedirectFromAuth } from '@friggframework/ui';

const AppRouter = (props) => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <Switch>
          <Route path="/integrations" exact component={IntegrationsPage} />
          <Route path="/settings" exact component={SettingsPage} />
          <Route path="/data/:integrationId" exact component={Data} />
          {/*<Route*/}
          {/*  path="/data/:integrationId"*/}
          {/*  exact*/}
          {/*  component={TestFormContainer}*/}
          {/*/>*/}
          <Route
            path="/redirect/:app"
            exact
            render={(routeProps) => (
              <RedirectFromAuth
                friggBaseUrl={process.env.REACT_APP_API_BASE_URL}
                authToken={sessionStorage.getItem('jwt')}
                app={routeProps.match.params.app}
                primaryEntityName="hubspot" //todo: replace with actual primary entity name
              />
            )}
          />
          <Route path="/logout" exact component={Logout} />
          <Redirect to="/integrations" />
        </Switch>
      </div>
    </>
  );
};

export default withRouter(AppRouter);
