import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter basename="/haunted-trivia">
    <App />
  </BrowserRouter>,
  rootElement,
);
