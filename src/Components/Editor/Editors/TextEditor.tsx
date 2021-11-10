import React from "react";
import {EditorProps} from "./EditorProps";
import SlideMenuItem from "../../Slide/Menu/SlideMenuItem";
import InputField from "../Fields/InputField";
import CommonEditorFields from "./CommonEditorFields";


const TextEditor:React.FC<EditorProps> = (props) => {
    return (
        <>
            <CommonEditorFields {...props}/>

            <SlideMenuItem title='Content' className="menu--item--editor--content" name="content" onOpen={props.onOpenSection} open={props.sections.content}>
                <InputField value={props.block.content} onChange={(_content) => props.onChange(props.block.id,{_content})}  inputName="content"/>
            </SlideMenuItem>
        </>
    )
}

export default TextEditor