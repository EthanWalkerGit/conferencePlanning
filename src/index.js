import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Nav from './Nav';
import Search from './Search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav />
    <Search />
  </React.StrictMode>
);
