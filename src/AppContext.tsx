import React, {Context} from "react";
import {SlideData} from "./Helpers/SlideData";
import StorageProviderInterface from "./Providers/StorageProviderInterface";
import SlidesLocalStorageProvider from "./Providers/SlidesLocalStorageProvider";
import Blockify from "./libraries/Blockify/blockify";
import {Block} from "./libraries/Blockify/models/block";

/**
 * AppContext Types
 */
export type AppContextProviderType = {
    slides: SlideData[]
}
export type AppSlideActionsType = {
    addSlide: (slide: SlideData) => void,
    updateSlide: (slide: SlideData) => void,
    deleteSlide: (slide: SlideData) => void
}
export type AppContextType = {
    state: AppContextProviderType,
    slideActions: AppSlideActionsType,
    blockifier: Blockify
}

/**
 * Storage elements
 */
const mainKey = 'tellThem__'
// @ts-ignore
const localStorage:StorageProviderInterface = new SlidesLocalStorageProvider()


/**
 * AppContext
 */
// @ts-ignore
const AppContext:Context<AppContextType> = React.createContext({slides: [], slideActions: {}})

export const useAppContext = () => React.useContext(AppContext);

// @ts-ignore
export const AppContextProvider: React.FC<{children: JSX.Element}> = ({children, ...props}) => {
    const storageKeySlides = mainKey+'slides'
    const [state, setState] = React.useState<AppContextProviderType>({slides: []});

    const blockifier = new Blockify()

    const slideActions: AppSlideActionsType = {
        addSlide: (slide: SlideData) => {
            const newState = {...state, slides: [...state.slides].concat([slide])}
            setState(newState)
        },
        updateSlide: (updatedSlide: SlideData) => {
            const updateSlides = [...state.slides];
            updateSlides.forEach((slide, i) => {
                if (slide.id === updatedSlide.id) {
                    updateSlides[i] = updatedSlide
                }
            })
            setState({...state, slides: updateSlides})
        },
        deleteSlide: (slide: SlideData) => {
            const newState = {...state, slides: [...state.slides].filter(tempSlide => slide.id !== tempSlide.id)}
            setState(newState)
        }
    }

    //ensure the change is updated in storage
    React.useEffect(() => {
        if (state.slides.length !== 0) {
            localStorage.save(storageKeySlides, state.slides);
        }
    }, [state.slides]);

    //ensure the data is retrieved at the beginning of the load
    React.useEffect(() => {
        localStorage.get(storageKeySlides).then((data) => {
            setState({...state, slides: data})
        })
    }, []);

    return (
        <AppContext.Provider value={{ state,  slideActions, blockifier}}>
            {children}
        </AppContext.Provider>
    );
};
