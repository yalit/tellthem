import React, {EventHandler, MouseEvent, MouseEventHandler, Ref, useRef, useState} from "react";
import './Styles/addPage.scss';
import {createPage, Page} from "../Helpers/Page";

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

    const display = displayForm ? <AddPageForm onAdd={OnAddPage} onCancel={OnCancelForm} /> : <AddPagePlusButton onClick={OnClickButton} />

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

type AddPageFormProps = {
    onAdd: Function,
    onCancel: EventHandler<MouseEvent>
}

const AddPageForm:React.FC<AddPageFormProps> = ({onAdd, onCancel}) => {
    const formRef:Ref<any> = useRef()
    const [title, useTitle] = useState<string>('')
    const [description, useDescription] = useState<string>('')

    const UpdateTitle = (e: any) => {
        useTitle(e.target.value)
    }

    const UpdateDescription = (e: any) => {
        useDescription(e.target.value)
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const formData = new FormData(formRef.current);

        reader.onload = function () {
            const newPage = createPage({title: formData.get('addPage__title') as string, description: formData.get('addPage__title') as string, img: reader.result as string})
            onAdd(newPage)
        }
        reader.readAsDataURL(formData.get('addPage__img') as Blob);
    }

    return (
        <form ref={formRef}>
            <label htmlFor="addPage__title">Title</label>
            <input type="text" name="addPage__title" value={title} onChange={UpdateTitle} required/>
            <label htmlFor="addPage__img">Image</label>
            <input type="file" name="addPage__img" required />
            <label htmlFor="addPage__description">Description</label>
            <input type="text" name="addPage__description" value={description} onChange={UpdateDescription} required/>
            <input type="submit" name={"Cancel"} value={"Cancel"} onClick={onCancel}/>
            <input type="submit" name={"Add"} value={"Add"} onClick={onSubmit}/>
        </form>

    )
}


export default AddPage