import React, {useEffect} from "react";
import {useDrag, useDragLayer, XYCoord} from "react-dnd";
import {Block} from "../libraries/Blockify/models/block";
import {useAppContext} from "../AppContext";
import {getEmptyImage} from "react-dnd-html5-backend";

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
    parentRefPosition: XYCoord,
    updateBlockPosition: (position: XYCoord) => void
}
export const DraggableDragLayer: React.FC<DraggableDragLayerProps> = ({block, parentRefPosition, updateBlockPosition}) => {
    const {blockifier} = useAppContext()
    const { currentOffset } =
        useDragLayer((monitor) => ({
            currentOffset: monitor.getSourceClientOffset()
        }))

    const getItemPosition = (itemOffset: XYCoord | null) => {
        if (parentRefPosition === null || itemOffset === null || block === null) return

        return {x: itemOffset.x - parentRefPosition.x, y: itemOffset.y - parentRefPosition.y}
    }

    useEffect(() => {
        if (currentOffset === null) return

        updateBlockPosition(getItemPosition(currentOffset)!)
    }, [currentOffset])

    if (block === null) return null

    return(
        blockifier.renderAsReact([block], {class: 'canvas--hovering--block', style: getItemPosition(currentOffset)})[0]
    )
}