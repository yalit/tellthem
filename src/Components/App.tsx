import React, {useState} from 'react';
import './Styles/App.scss';
import Header from "./Header";
import {ThemeProvider} from '@material-ui/core/styles';
import {useAppTheme} from "../Helpers/Theme";
import PageList from "./PageList";
import {Page} from "../Helpers/Page";
import PagesLocalStorageProvider from "../Providers/PagesLocalStorageProvider";
import StorageProviderInterface from "../Providers/StorageProviderInterface";

function App() {
    const mainKey = 'tellThem__pages'
    const localStorage:StorageProviderInterface = new PagesLocalStorageProvider()
    const [pages, usePages] = useState<Page[]>(localStorage.get(mainKey))

    const AddPage = (page: Page) => {
        const newPages = [...pages].concat([page]);
        localStorage.save(mainKey, newPages)
        usePages(newPages);
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
