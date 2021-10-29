import React from "react";
import {useDrag} from "react-dnd";
import {Block} from "../libraries/Blockify/models/block";

interface DraggableBlockProps {
    children: React.ReactNode,
    block: Block,
    classname: string
}

export const DRAGGABLE_ITEM = 'draggable'

export const DraggableBlock:React.FC<DraggableBlockProps> = ({children, block, classname}) => {
    const [{}, drag, dragRef] = useDrag(() => ({
        type: DRAGGABLE_ITEM,
        item: block,
    }))

    const draggableId = "draggable-"+block.name;

    return (
        <div key={draggableId} ref={drag} id={draggableId} className={"draggable "+classname}>
            {children}
        </div>
    )
}