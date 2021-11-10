import React from "react";
import {EditorProps} from "./EditorProps";
import CommonEditorFields from "./CommonEditorFields";


const ImageEditor:React.FC<EditorProps> = (props) => {
    return (
        <>
            <CommonEditorFields {...props}/>
        </>
    )
}

export default ImageEditor