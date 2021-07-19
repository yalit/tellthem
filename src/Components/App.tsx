import React, {useState} from 'react';
import './Styles/App.scss';
import Header from "./Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {useAppTheme} from "../Helpers/Theme";
import PageList from "./PageList";
import {Page} from "../Helpers/Page";

function App() {
    const [pages, usePages] = useState<Page[]>([])

    const AddPage = (page: Page) => {
        usePages([...pages].concat([page]));
        return true;
    }

    const EditPage = (page: Page) => {
        console.log(page)
        return true
    }

    const DeletePage = (page: Page) => {
        console.log(page)
        return true
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={useAppTheme()}>
                <Header/>
                <PageList pages={pages} onAddPage={AddPage} onEditPage={EditPage} onDeletePage={DeletePage}/>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
