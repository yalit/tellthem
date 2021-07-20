import React, {RefObject, TouchEvent, useRef, useState} from "react";
import Swipeable from 'react-native-gesture-handler';
import {Page} from "../Helpers/Page";
import './Styles/page.scss';

type PageDisplayProps = {
    page: Page
}

export const PageDisplay:React.FC<PageDisplayProps> = ({page}) => {
    let pageRef:RefObject<HTMLDivElement> = useRef(null);
    let [displayMoveAction, useDisplayMoveAction] = useState<string|null>(null)
    let touchStartX: number | undefined;
    const imgStyle = {
        backgroundImage: `url(${page.img})`
    }



    return (
        <div ref={pageRef} className={'page__display'} >
            {displayMoveAction && displayMoveAction === 'edit' && <div className={'page__action__delete_button'}>Edit</div>}
            <div className="page__display__img" style={imgStyle}></div>
            <div className="page__display__content">
                <div className="page__display__title">{page.title}</div>
                <div className="page__display__description">{page.description}</div>
            </div>
        </div>
    )
}