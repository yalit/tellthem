import React from 'react';
import './Styles/App.scss';
import Header from "./Header";
import AppContent from "./AppContent";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faTimes, faCaretRight, faCaretDown, faFont, faImage} from "@fortawesome/free-solid-svg-icons";
import {AppContextProvider} from "../AppContext";

library.add({faTrash, faTimes, faCaretDown,faCaretRight, faFont, faImage})

function App(){
    // @ts-ignore
    return (
        <React.Fragment>
            <Header/>
            <AppContextProvider>
                <AppContent />
            </AppContextProvider>
        </React.Fragment>
    );
}

export default App;
