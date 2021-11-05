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
import {ResizableOptions, Rect} from "@interactjs/types/index";
import {getPosition} from "../../Helpers/DOMHelper";
import interact from "interactjs";


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
    const [canvasSize, setCanvasSize] = useState<BlockSize & XYCoord | null>(null)
    const [canvasEdges, setCanvasEdges] = useState<Rect | null>(null)

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
        const canvasPosition = getPosition(canvasRef.current)
        setCanvasSize({width: canvasRef.current.clientWidth, height: canvasRef.current.clientHeight, ...canvasPosition})
        setCanvasEdges({
            top: canvasPosition.y,
            left: canvasPosition.x,
            right: canvasPosition.x + canvasRef.current.clientWidth,
            bottom: canvasPosition.y + canvasRef.current.clientHeight,
            width: canvasRef.current.clientWidth,
            height: canvasRef.current.clientHeight
        })
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

    const updateEditedBlockPositionAndSize = (position: XYCoord, size: BlockSize) => {
        if (editedBlock === null || editedBlock === undefined) return

        let newEditedBlock = editedBlock
        newEditedBlock.size = size
        newEditedBlock.position = position
        updateBlock(newEditedBlock.id, newEditedBlock) //only if existing block
    }

    const renderBlock = (block: Block) => {

        if (block !== editedBlock) {
            return (
                <ReactBlockFactory
                    key={block.id}
                    block={block}
                    onClick={editBlock}
                    className={'canvas--slide--block ' + (editedBlock === block ? 'edited' : '')}
                />
            )
        }

        const moveBlock = (rect: Rect) => {
            if (canvasSize === null || canvasEdges === null || rect.width === undefined || rect.height === undefined) return

            //forces the edges not out of the canvasEdges
            rect = {...rect, ...{
                top: Math.max(canvasEdges.top!, rect.top),
                bottom: Math.min(canvasEdges.bottom, rect.bottom),
                left: Math.max(canvasEdges.left, rect.left),
                right: Math.min(canvasEdges.right, rect.right)
            }}

            const newPosition:XYCoord = {
                x: (rect.left - canvasSize.x)/canvasSize.width*100,
                y: (rect.top - canvasSize.y)/canvasSize.height*100
            }

            //no use of the width and height of rect as constraining on the position of the edges... so must use the edges to ensure no width/height augmentation when constraining
            const newSize:BlockSize =  {
                width: ((rect.right - rect.left)/canvasSize.width)*100,
                height: ((rect.bottom - rect.top)/canvasSize.height)*100
            }
            updateEditedBlockPositionAndSize(newPosition, newSize)
        }

        //only resizable during edition
        const resizableOptions: ResizableOptions = {
            edges: { top: true, left: true, bottom: true, right: true },
            listeners: {
                move: (event)=> {
                    moveBlock(event.rect)
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