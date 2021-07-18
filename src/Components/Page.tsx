import React from "react";
import {Page} from "../Helpers/Page";
import './Styles/page.scss';

type PageSmallProps = {
    page: Page
}

export const PageSmall:React.FC<PageSmallProps> = ({page}) => {

    return (
        <div className={'page__small'}>{page.title}</div>
    )
}