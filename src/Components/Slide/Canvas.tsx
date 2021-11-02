import {SlideData} from "./SlideData";
import React, {useEffect, useRef, useState} from "react";
import {useDrop, XYCoord} from "react-dnd";
import {DRAGGABLE_TYPE_NEW_BLOCK, DraggableBlock, DraggableDragLayer} from "../Blocks/DraggableBlock";
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

    const [{ isActive, item, didDrop }, dropRef] = useDrop(() => ({
        accept: DRAGGABLE_TYPE_NEW_BLOCK,
        collect: (monitor) => ({
            item: monitor.getItem(),
            isActive: monitor.canDrop() && monitor.isOver(),
            didDrop: monitor.didDrop()
        })
    }))

    //update Hovering Block when hover is Active
    useEffect(() => {
        if (isActive && (hoveringBlock === null || hoveringBlock !== item )) {
            setHoveringBlock(getBlock({...item} as Block))
        } else if (!isActive){
            setHoveringBlock(null)
        }
    }, [isActive])

    //set Edited Block based on the drop
    useEffect(() => {
        if (didDrop && hoveringBlock !== null) {
            const newBlock = getBlock(hoveringBlock)
            addBlock(newBlock)
            editBlock(newBlock)
        }
    }, [didDrop])

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
                <div ref={dropRef} className="slide-display--slide--canvas">
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