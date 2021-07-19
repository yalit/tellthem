import React, {EventHandler, Ref, useRef, useState} from 'react';
import {createPage, Page} from "../Helpers/Page";

type EditPageFormProps = {
    onSubmit: EventHandler<any>,
    onCancel: EventHandler<any>,
    page?: Page
}

const EditPageForm:React.FC<EditPageFormProps> = ({onSubmit, onCancel, page}) => {
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
            const newPage = createPage({title: formData.get('addPage__title') as string, description: formData.get('addPage__title') as string, img: reader.result as string})
            onSubmit(newPage)
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
            <input type="submit" name={"Add"} value={"Add"} onClick={SubmitForm}/>
        </form>

    )
}

export default EditPageForm