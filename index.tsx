import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Browser detection is now applied in index.html before React loads
// This prevents re-renders and style recalculations

// Enable CSS :active states on iOS Safari.
// iOS suppresses :active unless there's a touchstart listener on the element
// or one of its ancestors. A single no-op listener on document fixes it globally.
document.addEventListener('touchstart', () => {}, { passive: true });

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
