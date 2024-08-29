import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import $ from "jquery"
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const root = $('#root')[0]
createRoot(root).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)