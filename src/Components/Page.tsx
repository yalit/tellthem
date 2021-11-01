import React, {RefObject, useRef} from "react";
import {SlideData} from "../Helpers/SlideData";
import './Styles/page.scss';

type PageDisplayProps = {
    page: SlideData
}

export const PageDisplay:React.FC<PageDisplayProps> = ({page}) => {
    let pageRef:RefObject<HTMLDivElement> = useRef(null);
    const imgStyle = {
        //backgroundImage: `url(${page.img})`
    }



    return (
        <div ref={pageRef} className={'page__display'} >
            <div className="page__display__content">
                <div className="page__display__title">{page.title}</div>
                <div className="page__display__description">{page.description}</div>
            </div>
        </div>
    )
}