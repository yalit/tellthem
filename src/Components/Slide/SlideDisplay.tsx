import React, {useState} from "react";
import {SlideData} from "./SlideData";

import '../Styles/Slide.scss'
import {AppSlideActionsType} from "../../AppContext";
import {Canvas} from "./Canvas";
import {Block} from "../Blocks/block";
import {SlideMenu} from "./SlideMenu";
import getBlock from "../Blocks/BlockFactory";

type SlideDisplayProps = {
    slide: SlideData,
    onClose: () => void,
    slideActions: AppSlideActionsType
}

function SlideDisplay({slide, onClose, slideActions}: SlideDisplayProps) {
    const [internalSlide, setInternalSlide] = useState<SlideData>(slide)
    const [editedBlock, setEditedBlock] = useState<Block | undefined>(undefined)

    const UpdateSlide = (slideData: Partial<SlideData>):void => {
        const updatedSlide = {...internalSlide, ...slideData}
        setInternalSlide(updatedSlide)
        slideActions.updateSlide(updatedSlide)
    }

    const addBlock = (block: Block) => {
        UpdateSlide({
            blocks: [...internalSlide.blocks].concat([block])
        })
    }

    const editBlock = (block: Block) => {
        if (block !== editedBlock) setEditedBlock(block)
    }

    const closeEditor = () => {
        setEditedBlock(undefined)
    }

    const updateBlock = (id:string, blockData: Partial<Block>) => {
        let updatedBlock = internalSlide.blocks.filter(internalBlock => internalBlock.id === id)

        if (updatedBlock.length === 0) return

        const blockToUpdate = getBlock({...updatedBlock[0], ...blockData})
        setEditedBlock(blockToUpdate)

        UpdateSlide({
            blocks: internalSlide.blocks.map(internalBlock => {
                if (id === internalBlock.id) return blockToUpdate
                return internalBlock
            })
        })
    }

    const deleteBlock = (block: Block) => {
        UpdateSlide({
            blocks: internalSlide.blocks.filter(internalBlock => internalBlock.id !== block.id)
        })
        closeEditor()
    }

    return (
        <React.Fragment>
            <div id="slide-display">
                <SlideMenu  closeSlide={onClose} currentSlide={internalSlide} updateSlide={UpdateSlide} editedBlock={editedBlock} updateBlock={updateBlock} closeEditor={closeEditor} deleteBlock={deleteBlock}/>
                <Canvas slide={internalSlide} addBlock={addBlock} editBlock={editBlock} editedBlock={editedBlock}/>
            </div>
        </React.Fragment>
    )
}

export default SlideDisplay

