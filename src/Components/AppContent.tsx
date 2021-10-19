import React from "react";
import {SlideData} from "../Helpers/SlideData";
import './Styles/Slide.scss';
import SlideCover from "./SlideCover";

export type AppContentProps = {
    slides: SlideData[],
    onAddPage: (slide: SlideData) => boolean,
    onEditPage: (slide: SlideData) => boolean,
    onDeletePage: (slide: SlideData) => boolean
}

export const DISPLAY_LIST = 'list'
export const DISPLAY_DETAIL = 'detail'

type AppContentState = {
    slides: SlideData[],
    display: "list" | "detail"
    detailSlide: SlideData | null
}

class AppContent extends React.Component<AppContentProps, AppContentState> {
    constructor(props: AppContentProps) {
        super(props);
        this.state = {
            slides: props.slides,
            display: DISPLAY_LIST,
            detailSlide: null
        }

        this.displayNewSlide = this.displayNewSlide.bind(this)
        this.displayExistingSlide = this.displayExistingSlide.bind(this)
        this.deleteExistingSlide = this.deleteExistingSlide.bind(this)
        this.displayList = this.displayList.bind(this)
    }

    displayNewSlide() {
        console.log('display new slide')
        this.setState({
            display: DISPLAY_DETAIL,
        })
    }

    displayExistingSlide(slide: SlideData) {
        console.log('display slide : ' + slide.title)
        this.setState({
            display: DISPLAY_DETAIL,
            detailSlide: slide
        })
    }

    deleteExistingSlide(slide: SlideData) {
        console.log('deletion of slide : ' + slide.title)
    }

    displayList (): boolean {
        return this.state.display === DISPLAY_LIST;
    }

    render() {
        if (this.displayList()) {
            return (
                <div id="slide-list">
                    <SlideCover key={'slide-id-new'} slide={null} onAdd={this.displayNewSlide} onShow={this.displayExistingSlide} onDelete={this.deleteExistingSlide} />
                    <SlideCover key={'slide-id-test'} slide={{id:"oiu", title: "Un super titre", description: "", template: ""}} onAdd={this.displayNewSlide} onShow={this.displayExistingSlide} onDelete={this.deleteExistingSlide} />
                    {/*{this.state.slides.map(slide => <SlideCover key={'slide-id-'+slide.id} slide={slide} onAdd={this.displayNewSlide} onShow={this.displayExistingSlide} onDelete={this.deleteExistingSlide} />)}*/}
                </div>
            )
        } else {
            return (
                <div className={""}>Un display de slide...</div>
            )
        }
    }
}

export default AppContent