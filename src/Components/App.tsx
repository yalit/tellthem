import React from 'react';
import './Styles/App.scss';
import Header from "./Header";
import AppContent from "./AppContent";

import {AppContextProvider} from "../AppContext";

function App(){
    // @ts-ignore
    return (
        <AppContextProvider>
            <>
                <Header/>
                <AppContent />
            </>
        </AppContextProvider>
    );
}

export default App;
