import React from "react";
import {EditorProps} from "./EditorProps";
import {SlideMenuItem} from "../../Slide/SlideMenuItem";
import {InputField} from "../Fields/InputField";
import Slider from "react-input-slider";


export const ImageEditor:React.FC<EditorProps> = ({block, onChange}) => {
    return (
        <>
            <SlideMenuItem title='Name' className="menu--item--editor--name" open={true}>
                <InputField value={block.displayName} onChange={(displayName) => onChange(block.id,{displayName})} inputName="name"/>
            </SlideMenuItem>

            <SlideMenuItem title='Size' className="menu--item--editor--sizes">
                <div className="menu--editor--data--item">
                    <div className="menu--editor--data--item--title">Width</div>
                    <div className="menu--editor--data--item--content">
                        <Slider  axis="x" x={block.width} onChange={({x}) => onChange(block.id, {width: x})} xmin={10} xmax={100 - block.position.x}/>
                    </div>
                </div>
                <div className="menu--editor--data--item">
                    <div className="menu--editor--data--item--title">Height</div>
                    <div className="menu--editor--data--item--content">
                        <Slider  axis="x" x={block.height} onChange={({x}) => onChange(block.id, {height: x})} xmin={10} xmax={100 - block.position.y}/>
                    </div>
                </div>
            </SlideMenuItem>

            <SlideMenuItem title='Content' className="menu--item--editor--content">
                <InputField value={block.content} onChange={(_content) => onChange(block.id,{_content})}  inputName="content"/>
            </SlideMenuItem>
        </>
    )
}