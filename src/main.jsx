import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { prepareIntro } from './lib/intro';
import 'lenis/dist/lenis.css';
import './styles/global.scss';

prepareIntro();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
