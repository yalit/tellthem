import React, {ReactElement, useState} from "react";
import {Block} from "../../../Blocks/block";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash, faTimes, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TextEditor from "./Editors/TextEditor";
import ImageEditor from "./Editors/ImageEditor";

library.add({
    edit: faEdit,
    times: faTimes,
    trash: faTrash
})

interface CanvasBlockEditorProps {
    block: Block,
    edited: boolean,
    editBlock: (block: Block) => void,
    updateBlock: (id: string, block: Partial<Block>) => void,
    deleteBlock: (block: Block) => void,
    closeEditor: () => void
}

const CanvasBlockEditor: React.FC<CanvasBlockEditorProps> = ({block, editBlock, updateBlock, deleteBlock, closeEditor, edited}) => {
    const [sections, setSections] = useState<{[key: string]: boolean}>({})

    const updateSectionStatus = (sectionStatus: {[key: string]: boolean}) => {
        setSections({...sections, ...sectionStatus})
    }

    const blockEditors: { [type: string]: ReactElement } = {
        'text': <TextEditor block={block} onChange={updateBlock} onOpenSection={updateSectionStatus} sections={sections}/>,
        'img': <ImageEditor block={block} onChange={updateBlock} onOpenSection={updateSectionStatus} sections={sections} />
    }

    return (
        <div className="menu--item--editor">
            <div className={'slide-display--menu--item menu--item--editor--title'}>
                <div className="slide-display--menu--item--title menu--editor--main--title">
                    <div className="" >{block.displayName + ' - ' + block.id}</div>
                    <div className="menu--item--editor--actions">
                        {edited ? (
                            <>
                                <div className="menu--editor--actions--delete" onClick={() => deleteBlock(block)}><FontAwesomeIcon icon={"trash"} /></div>
                                <div className="menu--editor--actions--close" onClick={closeEditor}><FontAwesomeIcon icon={"times"} /></div>
                            </>
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

export default CanvasBlockEditor