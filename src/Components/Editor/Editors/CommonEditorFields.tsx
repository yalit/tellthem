
import React from "react";

import {SlideMenuItem} from "../../Slide/Menu/SlideMenuItem";
import {InputField} from "../Fields/InputField";
import {SliderInput} from "../Fields/SliderInput";
import {EditorProps} from "./EditorProps";

export const CommonEditorFields:React.FC<EditorProps> = ({children,block, onChange, onOpenSection, sections}) => {
    return (
        <>
            <SlideMenuItem title='Name' className="menu--item--editor--name" name="name" onOpen={onOpenSection} open={sections.name}>
                <InputField value={block.displayName} onChange={(displayName) => onChange(block.id,{displayName})}  inputName="name"/>
            </SlideMenuItem>

            <SlideMenuItem title='Size' className="menu--item--editor--sizes" name="size" onOpen={onOpenSection} open={sections.size}>
                <div className="menu--editor--data--item">
                    <div className="menu--editor--data--item--title">Width</div>
                    <div className="menu--editor--data--item--content">
                        <SliderInput value={block.size.width} name="width" min={10} max={100 - block.position.x} onChange={(width) => onChange(block.id, {size: {width, height: block.size.height}})} />
                    </div>
                </div>
                <div className="menu--editor--data--item">
                    <div className="menu--editor--data--item--title">Height</div>
                    <div className="menu--editor--data--item--content">
                        <SliderInput value={block.size.height} name="height" min={10} max={100 - block.position.y} onChange={(height) => onChange(block.id, {size: {width: block.size.width, height}})} />
                    </div>
                </div>
            </SlideMenuItem>
        </>
    )
}