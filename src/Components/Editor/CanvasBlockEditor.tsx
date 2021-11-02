import React, {ReactElement} from "react";
import {Block} from "../Blocks/block";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TextEditor} from "./Editors/TextEditor";

interface CanvasBlockEditorProps {
    block: Block,
    edited: boolean,
    editBlock: (block: Block) => void,
    updateBlock: (id: string, block: Partial<Block>) => void,
    deleteBlock: (block: Block) => void,
    closeEditor: () => void
}

export const CanvasBlockEditor: React.FC<CanvasBlockEditorProps> = ({block, editBlock, updateBlock, deleteBlock, closeEditor, edited}) => {
    const blockEditors: { [type: string]: ReactElement } = {
        'text': <TextEditor block={block} onChange={updateBlock} />,
        'img': <div></div>
    }

    return (
        <div className="menu--item--editor">
            <div className={'slide-display--menu--item menu--item--editor--title'}>
                <div className="slide-display--menu--item--title menu--editor--main--title">
                    <div className="" >{block.displayName + ' - ' + block.id}</div>
                    <div className="menu--item--editor--actions">
                        {edited ? (
                            <div className="menu--editor--actions--close" onClick={closeEditor}><FontAwesomeIcon icon={"times"} /></div>
                        ) : (
                            <div className="menu--editor--actions--edit" onClick={() => editBlock(block)}><FontAwesomeIcon icon={"edit"} /></div>
                        )}
                    </div>
                </div>
            </div>
            {edited && blockEditors[block.type]}
        </div>
    )
}