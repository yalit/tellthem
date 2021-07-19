import React from 'react';
import ReactDOM from 'react-dom';
import './Components/Styles/skeleton/skeleton.css';
import './Components/Styles/skeleton/normalize.css';
import './index.scss';
import App from './Components/App';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
      <CssBaseline />
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

