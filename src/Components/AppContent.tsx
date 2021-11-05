import React, {useEffect} from "react";
import {createSlide, SlideData} from "./Slide/SlideData";
import './Styles/Slide.scss';
import SlideCover from "./Slide/SlideCover";
import SlideDisplay from "./Slide/SlideDisplay";
import {AppSlideActionsType, useAppContext} from "../AppContext";

export const DISPLAY_LIST = 'list'
export const DISPLAY_DETAIL = 'detail'

type AppContentState = {
    display: "list" | "detail"
    detailSlide: SlideData | null
}

const AppContent = () => {
    const [appState, useAppState] = React.useState<AppContentState>({display: DISPLAY_LIST, detailSlide:null})
    const {state, slideActions} = useAppContext()

    useEffect(() => {
        slideActions.setCurrentSlide(appState.detailSlide)
    }, [appState.detailSlide])

    const canDisplayList = () => {
        return appState.display === DISPLAY_LIST;
    }

    function DisplayNewSlide() {
        const slide = createSlide({title: "<New Title To Update>"})

        slideActions.addSlide(slide)
        useAppState({
            display: DISPLAY_DETAIL,
            detailSlide: slide
        })
    }

    function DisplayExistingSlide(slide: SlideData) {
        useAppState({
            display: DISPLAY_DETAIL,
            detailSlide: slide
        })
    }

    function DeleteExistingSlide(slide: SlideData) {
        slideActions.deleteSlide(slide)
    }

    function DisplayList() {
        useAppState({
            display: DISPLAY_LIST,
            detailSlide: null
        })
    }

    if (canDisplayList()) {
        return (
            <div id="slide-list">
                <SlideCover key={'slide-id-new'} slide={null} onAdd={DisplayNewSlide} onShow={DisplayExistingSlide} onDelete={DeleteExistingSlide} />
                {state.slides.map(slide => <SlideCover key={'slide-id-'+slide.id} slide={slide} onAdd={DisplayNewSlide} onShow={DisplayExistingSlide} onDelete={DeleteExistingSlide} />)}
            </div>
        )
    } else {
        return (
            <SlideDisplay slide={appState.detailSlide as SlideData} onClose={DisplayList} slideActions={slideActions}/>
        )
    }
}

export default AppContent