import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employer/dashboard" element={<Dashboard />} />
        <Route path="/employer/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
