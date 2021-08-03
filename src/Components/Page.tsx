import React, {EventHandler, RefObject, TouchEvent, useRef, useState} from "react";
import {Page} from "../Helpers/Page";
import './Styles/page.scss';
import './Styles/addEditPage.scss';
import EditPageForm from "./EditPageForm";

type PageDisplayProps = {
    page: Page,
    onEditPage: EventHandler<any>,
    onDeletePage: EventHandler<any>
}

export const PageDisplay:React.FC<PageDisplayProps> = ({page, onEditPage, onDeletePage}) => {
    let pageRef:RefObject<HTMLDivElement> = useRef(null)
    let [displayForm, useDisplayForm] = useState<boolean>(false)
    let [displayMoveAction, useDisplayMoveAction] = useState<string|null>(null)
    let touchStartX: number | undefined

    const imgStyle = {
        backgroundImage: `url(${page.img})`
    }

    const ToggleForm = () => {
        useDisplayForm(!displayForm)
    }

    const onSubmitEditForm = (page: Page) => {
        onEditPage(page)
        ToggleForm()
    }

    const onDeleteEditForm = (page: Page) => {
        onDeletePage(page);
        ToggleForm()
    }

    return (
        <div ref={pageRef} className={'page__display' + (displayForm ? ' edit__page':'')}>
            {displayForm ? <EditPageForm onSubmit={onSubmitEditForm} onCancel={ToggleForm} onDelete={onDeleteEditForm} page={page} /> :
            (
                <React.Fragment>
                    <div className="page__display__img" style={imgStyle} onClick={ToggleForm}></div>
                    <div className="page__display__content" onClick={ToggleForm}>
                        <div className="page__display__title">{page.title}</div>
                        <div className="page__display__description">{page.description}</div>
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}