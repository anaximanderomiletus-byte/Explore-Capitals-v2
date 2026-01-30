import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Browser detection is now applied in index.html before React loads
// This prevents re-renders and style recalculations

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
