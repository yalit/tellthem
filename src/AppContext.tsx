import React, {Context} from "react";
import {createSlide, SlideData} from "./Components/Slide/SlideData";
import StorageProviderInterface from "./Providers/StorageProviderInterface";
import SlidesLocalStorageProvider from "./Providers/SlidesLocalStorageProvider";

/**
 * AppContext Types
 */
export type AppContextProviderType = {
    slides: SlideData[],
    currentSlide: SlideData | null
}
export type AppSlideActionsType = {
    addSlide: (slide: SlideData) => void,
    updateSlide: (slide: SlideData) => void,
    deleteSlide: (slide: SlideData) => void,
    setCurrentSlide: (slide: SlideData | null) => void
}
export type AppContextType = {
    state: AppContextProviderType,
    slideActions: AppSlideActionsType
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
    const [state, setState] = React.useState<AppContextProviderType>({slides: [], currentSlide: null});

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
            const newState: AppContextProviderType = {...state, slides: [...state.slides].filter(tempSlide => slide.id !== tempSlide.id)}
            setState(newState)
        },
        setCurrentSlide: (slide: SlideData | null) => {
            const newState:AppContextProviderType = {...state, currentSlide: slide}
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
        localStorage.get(storageKeySlides).then((data: SlideData[]) => {
            setState({...state, slides: data.map((d) => createSlide(d))})
        })
    }, []);

    return (
        <AppContext.Provider value={{ state,  slideActions}}>
            {children}
        </AppContext.Provider>
    );
};
