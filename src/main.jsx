import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { TestLinter } from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestLinter />
  </StrictMode>,
)
