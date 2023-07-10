import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Data from './components/Data';
import Logout from './components/Logout';
import AuthRedirect from './components/AuthRedirect';
import IntegrationsPage from './pages/IntegrationsPage';
import SettingsPage from './pages/SettingsPage';

const AppRouter = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <Routes>
          <Route exact path="/integrations" element={<IntegrationsPage />} />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route exact path="/data/:integrationId" element={<Data />} />
          <Route exact path="/redirect/:app" element={<AuthRedirect />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate replace to="/integrations" />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRouter;
