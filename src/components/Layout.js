// components/Layout.js
import React from 'react';
import Navbar from './Navbar'; 
import Filter from './Filters';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <Navbar />
        <Filter />
      </header>

      <main className="layout-content container mt-2">
        {children}
      </main>

      <footer className="layout-footer navbar bg-body-tertiary fixed-bottom text-center d-flex justify-content-center align-items-center">
        <p>&copy; 2024 Forensics Platform. All rights reserved.</p>
      </footer> 
    </div>
  );
};

export default Layout;
