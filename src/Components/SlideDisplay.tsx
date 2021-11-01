import React, {useState} from "react";
import {SlideData} from "../Helpers/SlideData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './Styles/Slide.scss'
import {AppSlideActionsType, useAppContext} from "../AppContext";
import {DraggableBlock} from "./DraggableBlock";
import {Canvas} from "./Canvas";
import {Block, ImageBlock, TextBlock} from "./Blocks/block";

type SlideDisplayProps = {
    slide: SlideData,
    onClose: () => void,
    slideActions: AppSlideActionsType
}

function SlideDisplay(props: SlideDisplayProps) {
    const [internalSlide, useInternalSlide] = useState<SlideData>(props.slide)
    const availableBlocks: Block[] = [new TextBlock(), new ImageBlock()]

    const UpdateSlide = (slideData: Partial<SlideData>):void => {
        const updatedSlide = {...internalSlide, ...slideData}
        useInternalSlide(updatedSlide)
        props.slideActions.updateSlide(updatedSlide)
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
                <div className="slide-display--header">
                    <div className="slide-display--header--part slide-display--header--part-title">
                        <div className="slide-display--header--part--title">Title</div>
                        <div className="slide-display--header--part--data">
                            <TitleUpdateField  title={internalSlide.title} onChange={changeTitle} className="slide-display--header--part--title--input"/>
                        </div>
                    </div>
                    <div className="slide-display--header--part slide-display--header--part-blocks">
                        <div className="slide-display--header--part--title">Blocks</div>
                        <div className="slide-display--header--part--data">{availableBlocks.map(block => {
                            return (
                                <DraggableBlock key={block.name} block={block} classname="slide-display--header--block--display">
                                    <div className="slide-display--header--block--title">{block.displayName}</div>
                                </DraggableBlock>
                            )
                        })}</div>
                    </div>
                    <div className="slide-display--header--part slide-display--header--part-actions">
                        <div className="slide-display--close" onClick={props.onClose}>
                            <div className="slide-display--close--button"><FontAwesomeIcon icon={"times"} /></div>
                        </div>
                    </div>
                </div>
                <div className="slide-display--slide">
                    <Canvas slide={internalSlide} addBlock={addBlock} updateBlock={updateBlock} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SlideDisplay

type TitleUpdateProps = {
   title: string,
   onChange: (value: string) => void,
   className?: string
}
function TitleUpdateField({title, onChange, className}: TitleUpdateProps) {
    return (
        <div className={className}>
            <input value={title} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}