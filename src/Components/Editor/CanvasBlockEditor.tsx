import React, {ReactElement} from "react";
import {Block} from "../Blocks/block";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Slider from 'react-input-slider';
import {InputField} from "./Fields/InputField";
import {SlideMenuItem} from "../Slide/SlideMenuItem";
import {TextEditor} from "../Blocks/Editors/TextEditor";

interface CanvasBlockEditorProps {
    block: Block,
    updateBlock: (id: string, block: Partial<Block>) => void,
    deleteBlock: (block: Block) => void,
    closeEditor: () => void
}

export const CanvasBlockEditor: React.FC<CanvasBlockEditorProps> = ({block, updateBlock, deleteBlock, closeEditor}) => {
    const blockEditors: { [type: string]: ReactElement } = {
        'text': <TextEditor block={block} onChange={updateBlock} />,
        'img': <div></div>
    }

    return (
        <div className="menu--item--editor">
            <div className={'slide-display--menu--item menu--item--editor--title'}>
                <div className="slide-display--menu--item--title">
                    <div>Edit : {block.name}</div>
                    <div className="menu--item--editor--close" onClick={closeEditor}>
                        <FontAwesomeIcon icon={"times"} />
                    </div>
                </div>
            </div>
            {blockEditors[block.type]}
        </div>
    )
}