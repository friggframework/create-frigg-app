import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Item } from '../components/Integration';

export const MockedState = {
  auth: { token: 'test-token' },
};

const args = {
  layout: 'horizontal',
  data: {
    display: {
      name: 'Salesforce',
      description: 'Sales & CRM',
      icon: 'https://friggframework.org/assets/img/salesforce.jpeg',
    },
  },
};

const Mockstore = ({ authState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        auth: createSlice({
          name: 'auth',
          reducers: {},
          initialState: authState,
        }).reducer,
      }
    })}
  >
    {children}
  </Provider>
);

export default {
  args,
  component: Item,
  title: 'Design System/Item',
  excludeStories: "MockedState",
  decorators: [
    (story) => <BrowserRouter>{story()}</BrowserRouter>,
    (story) => <Mockstore authState={MockedState}>{story()}</Mockstore>,
  ],
};

export const Horizontal = {};

export const Vertical = {
  args: { ...args, layout: 'vertical' },
};

export const Row = {
  args: { ...args, layout: 'row' },
};
