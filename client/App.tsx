import React, { Component } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../bundle/output.css';
import DashboardContainer from '../client/containers/DashboardContainer';

export default function App() {

  return (
    <div>
      <DashboardContainer />
      <Router>
        <div>
          <Routes>
            <Route index />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
