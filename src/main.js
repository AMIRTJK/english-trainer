import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './app/styles/global.css';
import './shared/ui/ui.css';
const container = document.getElementById('root');
if (!container)
    throw new Error('Root element not found');
createRoot(container).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
