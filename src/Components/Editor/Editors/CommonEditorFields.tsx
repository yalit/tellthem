
import React from "react";

import {SlideMenuItem} from "../../Slide/SlideMenuItem";
import {InputField} from "../Fields/InputField";
import {SliderInput} from "../Fields/SliderInput";
import {EditorProps} from "./EditorProps";




export const CommonEditorFields:React.FC<EditorProps> = ({children,block, onChange}) => {
    return (
        <>
            <SlideMenuItem title='Name' className="menu--item--editor--name">
                <InputField value={block.displayName} onChange={(displayName) => onChange(block.id,{displayName})}  inputName="name"/>
            </SlideMenuItem>

            <SlideMenuItem title='Size' className="menu--item--editor--sizes">
                <div className="menu--editor--data--item">
                    <div className="menu--editor--data--item--title">Width</div>
                    <div className="menu--editor--data--item--content">
                        <SliderInput value={block.width} min={10} max={100 - block.position.x} onChange={(width) => onChange(block.id, {width})} />
                    </div>
                </div>
                <div className="menu--editor--data--item">
                    <div className="menu--editor--data--item--title">Height</div>
                    <div className="menu--editor--data--item--content">
                        <SliderInput value={block.height} min={10} max={100 - block.position.y} onChange={(height) => onChange(block.id, {height})} />
                    </div>
                </div>
            </SlideMenuItem>
        </>
    )
}