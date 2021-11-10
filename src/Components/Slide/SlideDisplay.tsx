import React, {useState} from "react";
import {SlideData} from "./SlideData";

import '../Styles/Slide.scss'
import {AppSlideActionsType} from "../../AppContext";
import {Canvas} from "./Canvas/Canvas";
import {Block} from "../Blocks/block";
import {SlideMenu} from "./Menu/SlideMenu";
import {getBlock} from "../Blocks/block";
import {Modal} from "../Modal";
import {CanvasBlockDeleteConfirmation} from "./Menu/Editor/CanvasBlockDeleteConfirmation";

type SlideDisplayProps = {
    slide: SlideData,
    onClose: () => void,
    slideActions: AppSlideActionsType
}

type ModalData = {
    display: boolean,
    content: JSX.Element | null,
    onClose: () => void,
    className: string
}

const defaultModalData = {content: null, display: false, className:'', onClose: () => {throw new Error("the onClose of the ModalData must be set")}}

function SlideDisplay({slide, onClose, slideActions}: SlideDisplayProps) {
    const [internalSlide, setInternalSlide] = useState<SlideData>(slide)
    const [editedBlock, setEditedBlock] = useState<Block | undefined>(undefined)
    const [modalData, setModalData] = useState<Partial<ModalData>>(defaultModalData)

    const closeModal = () => {
      setModalData(defaultModalData)
    }

    const UpdateSlide = (slideData: Partial<SlideData>): void => {
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
        (block.id !== editedBlock?.id && setEditedBlock(block))
    }

    const closeEditor = () => {
        setEditedBlock(undefined)
    }

    const updateBlock = (id: string, blockData: Partial<Block>) => {
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
        const closeConfirmation = () => {
            actualDeleteBlock(block)
            closeModal()
        }
        console.log("Deletion requested", block)
        setModalData({
            className: "delete--block--confirmation",
            display: true,
            onClose: closeModal,
            content: <CanvasBlockDeleteConfirmation block={block} onConfirm={closeConfirmation} onClose={closeModal}/>
        })
    }

    const actualDeleteBlock = (block: Block) => {
        UpdateSlide({
            blocks: internalSlide.blocks.filter(internalBlock => internalBlock.id !== block.id)
        })
        closeEditor()
    }

    return (
        <React.Fragment>
            <div id="slide-display">
                <SlideMenu
                    closeSlide={onClose}
                    currentSlide={internalSlide}
                    updateSlide={UpdateSlide}
                    editedBlock={editedBlock}
                    editBlock={editBlock}
                    updateBlock={updateBlock}
                    closeEditor={closeEditor}
                    deleteBlock={deleteBlock}
                />
                <Canvas
                    slide={internalSlide}
                    addBlock={addBlock}
                    updateBlock={updateBlock}
                    editBlock={editBlock}
                    editedBlock={editedBlock}
                />
            </div>
            <Modal display={modalData.display} onClose={modalData.onClose} className={modalData.className}>
                {modalData.content}
            </Modal>
        </React.Fragment>
    )
}

export default SlideDisplay

