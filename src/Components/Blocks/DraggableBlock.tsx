import React, {useEffect} from "react";
import {useDrag, useDragLayer, XYCoord} from "react-dnd";
import {Block} from "./block";
import {getEmptyImage} from "react-dnd-html5-backend";
import {getPosition} from "../../Helpers/DOMHelper";

interface DraggableBlockProps {
    children: React.ReactNode,
    block: Block,
    classname: string
}

export const DRAGGABLE_ITEM = 'draggable'

export const DraggableBlock:React.FC<DraggableBlockProps> = ({children, block, classname}) => {
    const [{}, dragRef, dragPreviewRef] = useDrag(() => ({
        type: DRAGGABLE_ITEM,
        item: block,
    }))

    const draggableId = "draggable-"+block.name;

    useEffect(() => {
        dragPreviewRef(getEmptyImage(), { captureDraggingState: true })
    }, [])

    return (
        <>
            <div key={draggableId} ref={dragRef} id={draggableId} className={"draggable "+classname}>
                {children}
            </div>
        </>
    )
}


interface DraggableDragLayerProps {
    block: Block | null,
    parentRef: HTMLElement,
    updateBlockPosition: (position: XYCoord) => void
}
export const DraggableDragLayer: React.FC<DraggableDragLayerProps> = ({block, parentRef, updateBlockPosition}) => {
    const { currentOffset } =
        useDragLayer((monitor) => ({
            currentOffset: monitor.getSourceClientOffset()
        }))

    const parentRefPosition = getPosition(parentRef)

    const getItemPosition = (itemOffset: XYCoord | null) => {
        if (parentRef === null || itemOffset === null || block === null) return
        return {x: (itemOffset.x - parentRefPosition.x)/parentRef.clientWidth*100, y: (itemOffset.y - parentRefPosition.x)/parentRef.clientHeight*100}
    }

    useEffect(() => {
        if (currentOffset === null) return

        updateBlockPosition(getItemPosition(currentOffset)!)
    }, [currentOffset])

    if (block === null) return null

    return(
        block.render('react', {class: 'canvas--hovering--block', style: getItemPosition(currentOffset)})
    )
}