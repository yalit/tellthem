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

function App(){
    const mainKey = 'tellThem__pages'
    const localStorage:StorageProviderInterface = new SlidesLocalStorageProvider()
    const [slides, useSlides] = useState<SlideData[]>(localStorage.get(mainKey))

    const AddPage = (slide: SlideData) => {
        const newSlides = [...slides].concat([slide]);
        UpdateSlidesContext(newSlides)
    }

    const EditPage = (updatedSlide: SlideData) => {
        console.log("Update slide : " + updatedSlide)
        const updateSlides = [...slides];
        updateSlides.forEach((slide, i) => {
            if (slide.id === updatedSlide.id) {
                updateSlides[i] = updatedSlide
            }
        })
        UpdateSlidesContext(updateSlides)
    }

    const DeletePage = (slide: SlideData) => {
        console.log("Delete slide : " + slide)
        const updatedSlides = [...slides].filter(tempSlide => slide.id !== tempSlide.id)

        UpdateSlidesContext([...updatedSlides])
    }

    const UpdateSlidesContext = (newSlides: SlideData[]): void => {
        localStorage.save(mainKey, newSlides)
        useSlides(newSlides);
    }

    return (
        <React.Fragment>
            <Header/>
            <AppContent slides={slides} addPage={AddPage} editPage={EditPage} deletePage={DeletePage}/>
        </React.Fragment>
    );
}

export default App;
