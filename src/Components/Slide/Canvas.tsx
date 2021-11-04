import React, {useEffect, useRef, useState} from "react";
import {useDrop, XYCoord} from "react-dnd";
import {SlideData} from "./SlideData";
import {
    DRAGGABLE_TYPE_EDITED_BLOCK,
    DRAGGABLE_TYPE_NEW_BLOCK,
    DraggableDragLayer
} from "../Blocks/DraggableBlock";
import {Block, BlockSize} from "../Blocks/block";
import getBlock from "../Blocks/BlockFactory";
import {resizable} from "../Resizable";
import ReactBlockFactory from "../Blocks/Renderer/ReactBlockFactory";
import {ResizableOptions} from "@interactjs/types/index";


interface CanvasProps {
    slide: SlideData,
    addBlock: (block: Block) => void,
    updateBlock: (id:string, block: Block) => void,
    editBlock: (block: Block) => void,
    editedBlock?: Block
}

export const Canvas: React.FC<CanvasProps> = ({slide, addBlock, editBlock, editedBlock, updateBlock}) => {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [hoveringBlock, setHoveringBlock] = useState<Block|null>(null)
    const [canvasSize, setCanvasSize] = useState<BlockSize | null>(null)

    const [{ item, didDrop }, dropReference] = useDrop(() => ({
        accept: [DRAGGABLE_TYPE_NEW_BLOCK, DRAGGABLE_TYPE_EDITED_BLOCK],
        collect: (monitor) => ({
            item: monitor.getItem(),
            didDrop: monitor.didDrop()
        })
    }))

    useEffect(() => {
        if (canvasRef === null) return
        if (canvasRef.current === null) return

        setCanvasSize({width: canvasRef.current.clientWidth, height: canvasRef.current.clientHeight})
    }, [])

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

    const updateEditedBlockSize = (size: BlockSize) => {
        if (editedBlock === null || editedBlock === undefined) return

        let newEditedBlock = editedBlock
        newEditedBlock.size = size
        updateBlock(newEditedBlock.id, newEditedBlock) //only if existing block
    }

    const renderBlock = (block: Block) => {

        const resizableOptions: ResizableOptions = {
            edges: { top: true, left: true, bottom: true, right: true },
            listeners: {
                move: (event) => {
                    if (canvasSize === null) return

                    const {width, height} = event.rect
                    let size: BlockSize = {width, height}
                    if (block.sizeUnit === '%') {
                        size = {
                            width: (width/canvasSize.width)*100,
                            height: (height/canvasSize.height)*100
                        }
                    }
                    updateEditedBlockSize(size)
                }
            }
        }

        const ResizableComponent = resizable(resizableOptions)(ReactBlockFactory)

        return (
            <ResizableComponent
                key={block.id}
                block={block}
                onClick={editBlock}
                className={'canvas--slide--block ' + (editedBlock === block ? 'edited' : '')}
            />
        )
        /*return (
            <Resizable
                key={block.id}>
                <DraggableBlock key={block.id} block={block} classname={""} type={DRAGGABLE_TYPE_EDITED_BLOCK}>
                    <ReactBlock
                        block={block}
                        onClick={editBlock}
                        className={'canvas--slide--block ' + (editedBlock === block ? 'edited' : '')}
                    />
                </DraggableBlock>
            </Resizable>
        )*/

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
                            return renderBlock(block)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}