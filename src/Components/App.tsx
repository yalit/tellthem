import React, {useState} from 'react';
import './Styles/skeleton/skeleton.css';
import './Styles/skeleton/normalize.css'
import './Styles/App.scss';
import Header from "./Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {useAppTheme} from "../Helpers/Theme";
import PageList from "./PageList";
import {createPage, Page} from "../Helpers/Page";

function App() {
    const [pages, usePages] = useState<Page[]>([])

    const AddPage = (page: Page) => {
        usePages([...pages].concat([page]));
        return true;
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={useAppTheme()}>
                <Header/>
                <PageList pages={pages} onAddPage={AddPage} />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
