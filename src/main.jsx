import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles-v4.css';

const root = document.getElementById('root');
// If the build was prerendered (root has children), hydrate; otherwise render fresh.
if (root.firstChild) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
