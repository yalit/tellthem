import React from "react";
import {EditorProps} from "./EditorProps";
import {SlideMenuItem} from "../../Slide/SlideMenuItem";
import {InputField} from "../Fields/InputField";
import {CommonEditorFields} from "./CommonEditorFields";


export const TextEditor:React.FC<EditorProps> = ({block, onChange}) => {
    return (
        <>
            <CommonEditorFields block={block} onChange={onChange} />

            <SlideMenuItem title='Content' className="menu--item--editor--content" open={true}>
                <InputField value={block.content} onChange={(_content) => onChange(block.id,{_content})}  inputName="content"/>
            </SlideMenuItem>
        </>
    )
}