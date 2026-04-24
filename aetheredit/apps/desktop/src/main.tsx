import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainLayout } from '@components/MainLayout';
import { useAppStore, initializeProject } from '@store/appStore';
import './index.css';

// Initialize project on load
initializeProject();

function App() {
  return <MainLayout />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
