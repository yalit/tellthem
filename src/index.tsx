import React from 'react';
import ReactDOM from 'react-dom';
import './Components/Styles/skeleton/skeleton.css';
import './Components/Styles/skeleton/normalize.css';
import './index.scss';
import App from './Components/App';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

ReactDOM.render(
  <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

