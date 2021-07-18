import React from 'react';
import './Styles/App.scss';
import Header from "./Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {useAppTheme} from "../Helpers/Theme";
import PageList from "./PageList";
import {createPage} from "../Helpers/Page";

function App() {
    let pages = [createPage({title: "Un super titre", img: "qsdmlkfjqmsldkfj", description: 'un superbe description'})]
    return (
        <React.Fragment>
            <ThemeProvider theme={useAppTheme()}>
                <Header/>
                <PageList pages={pages} />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
