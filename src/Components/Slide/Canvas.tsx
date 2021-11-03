import React, {useEffect, useRef, useState} from "react";
import {useDrop, XYCoord} from "react-dnd";
import {SlideData} from "./SlideData";
import {
    DRAGGABLE_TYPE_EDITED_BLOCK,
    DRAGGABLE_TYPE_NEW_BLOCK, DraggableBlock,
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


    const [{ item, didDrop }, dropReference] = useDrop(() => ({
        accept: [DRAGGABLE_TYPE_NEW_BLOCK, DRAGGABLE_TYPE_EDITED_BLOCK],
        collect: (monitor) => ({
            item: monitor.getItem(),
            didDrop: monitor.didDrop()
        })
    }))

    //update Hovering Block when new Block hover is Active
    useEffect(() => {
        if (hoveringBlock === item) return
        setHoveringBlock(item)
    }, [item])

    //set Edited Block based on the drop
    useEffect(() => {
        if (item === null || !didDrop) return

        let droppedBlock: Block = item

        if (didDrop && droppedBlock.id === '') {
            droppedBlock = getBlock({...item})
            addBlock(droppedBlock)
        }

        editBlock(droppedBlock)

    }, [didDrop])

    const updateHoveringBlockPosition = (position: XYCoord) => {
        if (hoveringBlock === null) return

        let newHoveringBlock = hoveringBlock
        newHoveringBlock.position = position
        setHoveringBlock(newHoveringBlock)

        if (newHoveringBlock.id !== '') editBlock(newHoveringBlock) //only if existing block
    }

    return (
        <>
            <div className="slide-display--slide">
                <div ref={dropReference} className="slide-display--slide--canvas">
                    <div ref={canvasRef} className="slide-display--slide--canvas--container">
                        <DraggableDragLayer
                            block={hoveringBlock}
                            parentRef={canvasRef?.current as HTMLElement}
                            updateBlockPosition={updateHoveringBlockPosition}

                        />
                        {slide.blocks.map((block, key) => {
                            return (
                                <DraggableBlock key={block.id} block={block} classname={""} type={DRAGGABLE_TYPE_EDITED_BLOCK}>
                                    {block.render('react', {
                                        class: 'canvas--slide--block ' + (editedBlock === block ? 'edited' : ''),
                                        onClick: editBlock,
                                        id: `${key}`
                                    })}
                                </DraggableBlock>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}