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
        RefreshDisplay(newPages)
        return true;
    }

    const EditPage = (page: Page) => {
        console.log(page)
        const editedPages = pages.map(p => (p.id === page.id) ? page : p)
        RefreshDisplay(editedPages)
        return true
    }

    const DeletePage = (page: Page) => {
        const editedPages = pages.filter(p => p.id !== page.id)
        RefreshDisplay(editedPages)
        return true
    }

    const RefreshDisplay = (pages: Array<Page>) => {
        localStorage.save(mainKey, pages)
        usePages(pages);
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
