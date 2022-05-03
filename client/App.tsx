import React, { Component } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import '../bundle/output.css';

export default function App() {

  return (
    <div className="text-indigo-500 text-sm">
      HELLO TAILWIND
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
