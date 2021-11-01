import React from "react";
import {Block} from "../Blocks/block";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Slider from 'react-input-slider';

interface CanvasBlockEditorProps {
    block: Block,
    updateBlock: (block: Partial<Block>) => void,
    deleteBlock: (block: Block) => void,
    closeEditor: () => void,
    maxSize: {width: number, height: number}
}

export const CanvasBlockEditor: React.FC<CanvasBlockEditorProps> = ({block, updateBlock, deleteBlock, closeEditor, maxSize}) => {
    const handleContentChange = (data: any) => {
        updateBlock({'_content': data}) //Todo : handle the data when it's an image block...
    }

    const handleWidthChange = (width: number) => {
        updateBlock({width})
    }

    const handleHeightChange = (height: number) => {
        updateBlock({height})
    }

    return (
        <div className="slide-display--slide--canvas-editor">
            <div className="slide-display--slide--canvas--editor--title">
                {block.name}
            </div>
            <div className="slide-display--slide--canvas--editor--form">
                Content : <input name="content" value={block.content} onChange={(e) => handleContentChange(e.target.value)} />
                Width : <Slider  axis="x" x={block.width} onChange={({x}) => handleWidthChange(x)} xmin={10} xmax={100}/> {/*TODO : compute xmax based on position*/}
                Height : <Slider  axis="x" x={block.height} onChange={({x}) => handleHeightChange(x)} xmin={10} xmax={100}/>
            </div>
            <div className="slide-display--close" onClick={closeEditor}>
                <div className="slide-display--close--button"><FontAwesomeIcon icon={"times"} /></div>
            </div>
        </div>
    )
}