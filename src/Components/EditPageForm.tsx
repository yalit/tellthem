import React, {EventHandler, Ref, useRef, useState} from 'react';
import {createPage, editPage, Page, PageData} from "../Helpers/Page";

type EditPageFormProps = {
    onSubmit: EventHandler<any>,
    onCancel: EventHandler<any>,
    onDelete?: EventHandler<any>
    page?: Page
}

const EditPageForm:React.FC<EditPageFormProps> = ({onSubmit, onCancel, page, onDelete}) => {
    const formRef:Ref<any> = useRef()
    const [title, useTitle] = useState<string>((page && page.title) || '')
    const [description, useDescription] = useState<string>((page && page.description) || '')

    const UpdateTitle = (e: any) => {
        useTitle(e.target.value)
    }

    const UpdateDescription = (e: any) => {
        useDescription(e.target.value)
    }

    const SubmitForm = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const formData = new FormData(formRef.current);

        reader.onload = function () {
            const pageData: PageData = {title: formData.get('formPage__data__title') as string, description: formData.get('formPage__data__description') as string, img: reader.result as string}
            if (page) {
                const editedPage = editPage(page, pageData)
                onSubmit(editedPage)
            } else {
                const newPage = createPage(pageData)
                onSubmit(newPage)
            }
        }
        reader.readAsDataURL(formData.get('formPage__data__img') as Blob);
    }

    const DeletePage = (e: any) => {
        if (onDelete) {
            onDelete(page)
        }
    }

    return (
        <form ref={formRef}>
            <label htmlFor="formPage__data__title">Title</label>
            <input type="text" name="formPage__data__title" value={title} onChange={UpdateTitle} required/>
            <label htmlFor="formPage__data__img">Image</label>
            <input type="file" name="formPage__data__img" required />
            <label htmlFor="formPage__data__description">Description</label>
            <input type="text" name="formPage__data__description" value={description} onChange={UpdateDescription} required/>
            <input type="submit" name={"Cancel"} value={"Cancel"} onClick={onCancel}/>
            <input type="submit" name={"Submit"} value={page ? "Edit" : "Add"} onClick={SubmitForm}/>
            {page && <input type="submit" name={"Delete"} value={"Delete"} onClick={DeletePage}/>}
        </form>

    )
}

export default EditPageForm