import {SlideData} from "./SlideData";
import React, {useEffect, useRef, useState} from "react";
import {useDrop, XYCoord} from "react-dnd";
import {
    DRAGGABLE_TYPE_EDITED_BLOCK,
    DRAGGABLE_TYPE_NEW_BLOCK,
    DraggableDragLayer
} from "../Blocks/DraggableBlock";
import {Block} from "../Blocks/block";
import getBlock from "../Blocks/BlockFactory";


interface CanvasProps {
    slide: SlideData,
    addBlock: (block: Block) => void,
    editBlock: (block: Block) => void,
    editedBlock?: Block
}

export const Canvas: React.FC<CanvasProps> = ({slide, addBlock, editBlock, editedBlock}) => {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [hoveringBlock, setHoveringBlock] = useState<Block|null>(null)


    const [{ isNewActive, newItem, didNewDrop }, newDropRef] = useDrop(() => ({
        accept: DRAGGABLE_TYPE_NEW_BLOCK,
        collect: (monitor) => ({
            newItem: monitor.getItem(),
            isNewActive: monitor.canDrop() && monitor.isOver(),
            didNewDrop: monitor.didDrop()
        })
    }))

    const [{isEditedActive, editedItem, didEditedDrop}, editedDropRef] = useDrop(() => ({
        accept: DRAGGABLE_TYPE_EDITED_BLOCK,
        collect: (monitor) => ({
            editedItem: monitor.getItem(),
            isEditedActive: monitor.canDrop() && monitor.isOver(),
            didEditedDrop: monitor.didDrop()
        })
    }))

    //update Hovering Block when new Block hover is Active
    useEffect(() => {
        if (isNewActive && (hoveringBlock === null || hoveringBlock !== newItem )) {
            setHoveringBlock(getBlock({...newItem} as Block))
        } else if (!isNewActive){
            setHoveringBlock(null)
        }
    }, [isNewActive])

    //update Hovering Block when edited Block hover is Active
    useEffect(() => {
        if (isEditedActive && (hoveringBlock === null || hoveringBlock !== editedItem )) {
            setHoveringBlock(getBlock({...editedItem} as Block))
        } else if (!isEditedActive){
            setHoveringBlock(null)
        }
    }, [isEditedActive])

    //set Edited Block based on the drop
    useEffect(() => {
        if (didNewDrop && hoveringBlock !== null) {
            const newBlock = getBlock(hoveringBlock)
            addBlock(newBlock)
            editBlock(newBlock)
        }
    }, [didNewDrop])

    //reset Hovering Block on any drop
    useEffect(() => {
        if ((didNewDrop || didEditedDrop) && hoveringBlock !== null) {
            setHoveringBlock(null)
        }
    }, [didNewDrop, didEditedDrop])

    //When block is edited ==> no more hovering block
    useEffect(() => {
        setHoveringBlock(null)
    }, [editedBlock])

    const updateHoveringBlockPosition = (position: XYCoord) => {
        if (hoveringBlock === null) return

        let newHoveringBlock = getBlock(hoveringBlock)
        newHoveringBlock.position = position
        setHoveringBlock(newHoveringBlock)
    }

    return (
        <>
            <div className="slide-display--slide">
                <div ref={(node) => editedDropRef(newDropRef(node))} className="slide-display--slide--canvas">
                    <div ref={canvasRef} className="slide-display--slide--canvas--container">
                        <DraggableDragLayer
                            block={hoveringBlock}
                            parentRef={canvasRef?.current as HTMLElement}
                            updateBlockPosition={updateHoveringBlockPosition}

                        />
                        {slide.blocks.map((block, k) => {
                            return block.render('react', {class: 'canvas--slide--block '+(editedBlock === block ? 'edited' : ''), onClick: editBlock, id: ""+k})
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}