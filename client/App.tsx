import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../bundle/output.css';
import DashboardContainer from '../client/containers/DashboardContainer';

export default function App() {

  return (
    <Provider store={store}>
      <div className='bg-violet-400 h-screen'>
        <DashboardContainer />
        <Router>
          <div>
            <Routes>
              <Route index />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  )
}
