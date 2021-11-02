import React from "react";
import {SlideData} from "./SlideData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type SlideCoverProps = {
    slide: SlideData | null,
    onAdd: () => void,
    onShow: (slide: SlideData) => void,
    onDelete: (slide: SlideData) => void
}

const SlideCover:React.FC<SlideCoverProps> = (props:SlideCoverProps) => {


    return (
        <div className="slide-cover">
            {props.slide ? (
                    <React.Fragment>
                        <div className="slide-cover--title" onClick={() => props.onShow(props.slide as SlideData)} >{props.slide.title}</div>
                        <div className="slide-cover--delete" onClick={() => props.onDelete(props.slide as SlideData)}>
                            <div className="slide-cover--delete--button"><FontAwesomeIcon icon={"trash"} /></div>
                        </div>
                    </React.Fragment>
                ):
                (
                    <div className="slide-cover--add" onClick={props.onAdd}>
                        <div className="slide-cover--add--button" />
                        <div className="slide-cover--title">Add a slide</div>
                    </div>
                )}

        </div>
    );
}

export default SlideCover