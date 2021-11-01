import {SlideData} from "../Helpers/SlideData";
import React, {useEffect, useRef, useState} from "react";
import {useDrop, XYCoord} from "react-dnd";
import {DRAGGABLE_ITEM, DraggableBlock, DraggableDragLayer} from "./DraggableBlock";
import {Block} from "../libraries/Blockify/models/block";
import {useAppContext} from "../AppContext";
import {CanvasBlockEditor} from "./CanvasBlockEditor";
import {getPosition} from "../Helpers/DOMHelper";
import getBlock, {BlockData} from "../libraries/Blockify/BlockFactory";


interface CanvasProps {
    slide: SlideData,
    addBlock: (block: Block) => void,
    updateBlock: (block: Block) => void
}

export const Canvas: React.FC<CanvasProps> = ({slide, addBlock, updateBlock}) => {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [hoveringBlock, setHoveringBlock] = useState<Block|null>(null)
    const [editedBlock, setEditedBlock] = useState<Block|null>(null)
    const {blockifier}= useAppContext()

    const [{ isActive, item, didDrop }, dropRef] = useDrop(() => ({
        accept: DRAGGABLE_ITEM,
        collect: (monitor) => ({
            item: monitor.getItem(),
            isActive: monitor.canDrop() && monitor.isOver(),
            didDrop: monitor.didDrop()
        })
    }))

    //update Hovering Block when hover is Active
    useEffect(() => {
        if (isActive && (hoveringBlock === null || hoveringBlock !== item )) {
            setHoveringBlock(item as Block)
        } else if (!isActive){
            setHoveringBlock(null)
        }
    }, [isActive])

    //set Edited Block based on the drop
    useEffect(() => {
        if (didDrop && hoveringBlock !== null) {
            const newBlock = getBlock({...hoveringBlock})
            addBlock(newBlock)
            setNewEditedBlock(newBlock)
        }
    }, [didDrop])

    //When block is edited ==> no more hovering block
    useEffect(() => {
        setHoveringBlock(null)
    }, [editedBlock])

    const updateHoveringBlockPosition = (position: XYCoord) => {
        if (hoveringBlock === null) return

        let newHoveringBlock = getBlock({...hoveringBlock})
        newHoveringBlock.position = position
        setHoveringBlock(newHoveringBlock)
    }

    const setNewEditedBlock = (block: Block) => {
        if (block === editedBlock) return
        setEditedBlock(block)
    }

    const updateEditedBlock = (blockData: Partial<BlockData>) => {
        if (editedBlock === null) return

        const updatedBlock = getBlock({...editedBlock, ...blockData})
        updateBlock(updatedBlock)
        setEditedBlock(updatedBlock)
    }

    const deleteEditedBlock = (block: Block) => {
        console.log(block)

    }

    return (
        <>
            {editedBlock !== null &&
                <CanvasBlockEditor
                    block={editedBlock}
                    updateBlock={updateEditedBlock}
                    deleteBlock={(block) => console.log(block)}
                    closeEditor={() => setEditedBlock(null)}
                    maxSize={canvasRef && {width: canvasRef.current?.clientWidth!, height: canvasRef.current?.clientHeight!}}
                />
            }
            <div ref={dropRef} className="slide-display--slide--canvas">
                <div ref={canvasRef} className="slide-display--slide--canvas--container">
                    <DraggableDragLayer
                        block={hoveringBlock}
                        parentRefPosition={getPosition(canvasRef?.current as HTMLElement)}
                        updateBlockPosition={updateHoveringBlockPosition}

                    />
                    {slide.blocks.map((block, k) => {
                        return blockifier.renderAsReact(block, {class: 'canvas--slide--block '+(editedBlock === block ? 'edited' : ''), handleBlock: setNewEditedBlock, id: ""+k})
                    })}
                </div>
            </div>
        </>
    )
}