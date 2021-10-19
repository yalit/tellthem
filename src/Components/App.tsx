import React, {useState} from 'react';
import './Styles/App.scss';
import Header from "./Header";
import SlidesLocalStorageProvider from "../Providers/SlidesLocalStorageProvider";
import StorageProviderInterface from "../Providers/StorageProviderInterface";
import AppContent from "./AppContent";
import {SlideData} from "../Helpers/SlideData";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash)

function App() {
    const mainKey = 'tellThem__pages'
    const localStorage:StorageProviderInterface = new SlidesLocalStorageProvider()
    const [slides, useSlides] = useState<SlideData[]>(localStorage.get(mainKey))

    const AddPage = (page: SlideData) => {
        const newPages = [...slides].concat([page]);
        localStorage.save(mainKey, newPages)
        useSlides(newPages);
        return true;
    }

    const EditPage = (page: SlideData) => {
        console.log(page)
        return true
    }

    const DeletePage = (page: SlideData) => {
        console.log(page)
        return true
    }

    return (
        <React.Fragment>
            <Header/>
            <AppContent slides={slides} onAddPage={AddPage} onEditPage={EditPage} onDeletePage={DeletePage}/>
        </React.Fragment>
    );
}

export default App;
