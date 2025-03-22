import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter from react-router-dom
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>  {/* Wrap the App component with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);