import React from 'react';
import './Styles/App.css';
import Header from "./Header";
import { ThemeProvider } from '@material-ui/core/styles';
import { useAppTheme } from "../Helpers/Theme";

function App() {
  return (
      <React.Fragment>
          <ThemeProvider theme={useAppTheme()}>
            <Header />
            <div>Hello World !</div>
          </ThemeProvider>
      </React.Fragment>
  );
}

export default App;
