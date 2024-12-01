import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Network from './components/Network';
import Linux from './components/Linux';
import Windows from './components/Windows';
import Memory from './components/Memory';
import Home from "./components/Home";
import Filters from "./components/Filters";

function App() {
  return (
    <Router>

      <Layout>
        <Routes >
          <Route path="/Network" element={<Network />} />
          <Route path="/Linux" element={<Linux />} />
          <Route path="/Memory" element={<Memory />} />
          <Route path="/Windows" element={<Windows />} />
        </Routes>
      </Layout>
      
    </Router>
  );
}
export default App;
