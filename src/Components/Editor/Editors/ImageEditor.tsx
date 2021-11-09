import React from "react";
import {EditorProps} from "./EditorProps";
import {CommonEditorFields} from "./CommonEditorFields";


export const ImageEditor:React.FC<EditorProps> = (props) => {
    return (
        <>
            <CommonEditorFields {...props}/>
        </>
    )
}