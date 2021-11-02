import React, {useState} from "react";
import {SlideData} from "./SlideData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import '../Styles/Slide.scss'
import {AppSlideActionsType} from "../../AppContext";
import {DraggableBlock} from "../Blocks/DraggableBlock";
import {Canvas} from "./Canvas";
import {Block, ImageBlock, TextBlock} from "../Blocks/block";
import {SlideMenu} from "./SlideMenu";

type SlideDisplayProps = {
    slide: SlideData,
    onClose: () => void,
    slideActions: AppSlideActionsType
}

function SlideDisplay({slide, onClose, slideActions}: SlideDisplayProps) {
    const [internalSlide, useInternalSlide] = useState<SlideData>(slide)

    const UpdateSlide = (slideData: Partial<SlideData>):void => {
        const updatedSlide = {...internalSlide, ...slideData}
        useInternalSlide(updatedSlide)
        slideActions.updateSlide(updatedSlide)
    }

    const changeTitle = (title: string) => {
        UpdateSlide({title})
    }

    const addBlock = (block: Block) => {
        UpdateSlide({
            blocks: [...internalSlide.blocks].concat([block])
        })
    }

    const updateBlock = (block: Block) => {
        UpdateSlide({
            blocks: internalSlide.blocks.map(internalBlock => {
                if (block.id === internalBlock.id) return block
                return internalBlock
            })
        })
    }

    return (
        <React.Fragment>
            <div id="slide-display">
                <SlideMenu  closeSlide={onClose} currentSlide={internalSlide} updateSlide={UpdateSlide}/>
                <Canvas slide={internalSlide} addBlock={addBlock} updateBlock={updateBlock} />
            </div>
        </React.Fragment>
    )
}

export default SlideDisplay

