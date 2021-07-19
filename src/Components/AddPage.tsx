import React, {MouseEvent, MouseEventHandler, useState} from "react";
import './Styles/addPage.scss';
import {Page} from "../Helpers/Page";
import EditPageForm from "./EditPageForm";

type AddPageProps = {
    onAdd: Function
}

const AddPage:React.FC<AddPageProps> = ({onAdd}) => {
    const [displayForm, useDisplayForm] = useState<boolean>(false);

    const OnClickButton = () => {
        useDisplayForm(true);
    }

    const OnCancelForm = (e: MouseEvent) => {
        e.preventDefault()
        useDisplayForm(false)
    }

    const OnAddPage = (page: Page) => {
        useDisplayForm(!onAdd(page))
    }

    const display = displayForm ? <EditPageForm onSubmit={OnAddPage} onCancel={OnCancelForm} /> : <AddPagePlusButton onClick={OnClickButton} />

    return (
        <div className={'add__page ' + (displayForm && 'form__opened')}>{display}</div>
    )
}

type AddPagePlusButtonProps = {
    onClick: MouseEventHandler
}

const AddPagePlusButton:React.FC<AddPagePlusButtonProps> = ({onClick}) => {
    return (
        <div onClick={onClick}>+</div>
    )
}


export default AddPage