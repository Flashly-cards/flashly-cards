import React, { Component } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './AppStyles.css';

export default function App() {

  return (
    <div>
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
