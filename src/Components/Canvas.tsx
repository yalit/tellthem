import {SlideData} from "../Helpers/SlideData";
import React, {useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import {DRAGGABLE_ITEM} from "./DraggableBlock";
import {Block} from "../libraries/Blockify/models/block";
import Blockify from "../libraries/Blockify/blockify";
import {useAppContext} from "../AppContext";


interface CanvasProps {
    slide: SlideData,
    addBlock: (block: Block) => void,
    updateBlock: (block: Block) => void
}

export const Canvas: React.FC<CanvasProps> = ({slide, addBlock, updateBlock}) => {
    const [hoveringBlock, setHoveringBlock] = useState<Block|null>(null)
    const {blockifier}= useAppContext()

    const [{ isActive, item }, dropRef] = useDrop(() => ({
        accept: DRAGGABLE_ITEM,
        collect: (monitor) => ({
            item: monitor.getItem(),
            isActive: monitor.canDrop() && monitor.isOver(),
        })
    }))

    useEffect(() => {
        if (isActive && (hoveringBlock === null || hoveringBlock !== item )) {
            setHoveringBlock(item as Block)
        }
    }, [isActive])

    useEffect(() => {
        if (hoveringBlock === null) return

    }, [hoveringBlock])
    return (
        <>
            <div ref={dropRef} className="slide-display--slide--canvas">
                {hoveringBlock !== null && blockifier.renderAsReact([hoveringBlock as Block], {class: 'canvas--hovering--block'}).map(block => block)[0]}
                {hoveringBlock?.name}
            </div>
        </>
    )
}