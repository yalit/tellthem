import React from "react";
import {DraggableBlock} from "../Blocks/DraggableBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Block, ImageBlock, TextBlock} from "../Blocks/block";
import {SlideData} from "./SlideData";
import {InputField} from "../Editor/Fields/InputField";
import {SlideMenuItem} from "./SlideMenuItem";


interface SlideMenuProps {
    currentSlide: SlideData,
    updateSlide: (slideData: Partial<SlideData>) => void
    closeSlide: () => void
}

export const SlideMenu:React.FC<SlideMenuProps> = ({currentSlide, updateSlide, closeSlide}) => {
    const availableBlocks: Block[] = [new TextBlock(), new ImageBlock()]

    return (
        <div className="slide-display--menu">
            <SlideMenuItem title='Title' className="menu--item--title">
                <InputField value={currentSlide.title} onChange={(data) => updateSlide({title: data})} />
            </SlideMenuItem>
            <div className="slide-display--menu--part slide-display--menu--part-blocks">
                <div className="slide-display--menu--part--title">Blocks</div>
                <div className="slide-display--menu--part--data">{availableBlocks.map(block => {
                    return (
                        <DraggableBlock key={block.name} block={block} classname="slide-display--menu--block--display">
                            <div className="slide-display--menu--block--title">{block.displayName}</div>
                        </DraggableBlock>
                    )
                })}</div>
            </div>
            <div className="slide-display--menu--actions">
                <div className="slide-display--menu--actions--action slide-display--menu--actions--close" onClick={closeSlide}>
                    <FontAwesomeIcon icon={"times"} />
                </div>
            </div>
        </div>
    )
}