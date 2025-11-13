import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './RootLayout.css';

function RootLayout() {
  return (
    <div className="root-layout">
      <NavBar />
      <main className="root-layout__content">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;

