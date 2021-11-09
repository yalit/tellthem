import React, {useEffect} from "react";
import {useDrag, useDragLayer, XYCoord} from "react-dnd";
import {Block} from "../../Blocks/block";
import {getEmptyImage} from "react-dnd-html5-backend";
import {getPosition} from "../../../Helpers/DOMHelper";
import ReactBlockFactory from "../../Blocks/Renderer/ReactBlockFactory";

interface DraggableBlockProps {
    children: React.ReactNode,
    block: Block,
    classname: string,
    type: typeof DRAGGABLE_TYPES[number]
}

export const DRAGGABLE_TYPE_NEW_BLOCK = 'newBlock'
export const DRAGGABLE_TYPE_EDITED_BLOCK = 'editedBlock'
export const DRAGGABLE_TYPES = [DRAGGABLE_TYPE_NEW_BLOCK, DRAGGABLE_TYPE_EDITED_BLOCK]

export const DraggableBlock:React.FC<DraggableBlockProps> = ({children, block, classname, type}) => {
    const [{isDragging}, dragRef, dragPreviewRef] = useDrag(() => ({
        type: type,
        item: block,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }), [block])

    const draggableId = "draggable-"+block.id;

    useEffect(() => {
        dragPreviewRef(getEmptyImage(), { captureDraggingState: true })
    }, [])

    return (
        <div key={draggableId} ref={dragRef} id={draggableId} className={"draggable "+classname}>
            { (block.id === '' || (!isDragging)) && children}
        </div>
    )
}


interface DraggableDragLayerProps {
    block: Block | null,
    parentRef: HTMLElement,
    updateBlockPosition: (position: XYCoord) => void
}

export const DraggableDragLayer: React.FC<DraggableDragLayerProps> = ({block, parentRef, updateBlockPosition}) => {
    const { currentOffset, isDragging } =
        useDragLayer((monitor) => ({
            currentOffset: monitor.getClientOffset(),
            isDragging: monitor.isDragging()
        }))

    const parentRefPosition = getPosition(parentRef)

    const getItemPosition = (itemOffset: XYCoord | null) => {
        if (parentRef === null || itemOffset === null || block === null) return
        return {x: (itemOffset.x - parentRefPosition.x)/parentRef.clientWidth*100, y: (itemOffset.y - parentRefPosition.y)/parentRef.clientHeight*100}
    }

    useEffect(() => {
        if (currentOffset === null) return

        updateBlockPosition(getItemPosition(currentOffset)!)
    }, [currentOffset])

    if (block === null || !isDragging) return null

    return(
        <ReactBlockFactory key={"draggable-layer"} block={block} className={"canvas--hovering--block"} style={getItemPosition(currentOffset)} />
    )
}