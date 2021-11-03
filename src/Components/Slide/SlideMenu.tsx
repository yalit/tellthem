import React from "react";
import {DRAGGABLE_TYPE_NEW_BLOCK, DraggableBlock} from "../Blocks/DraggableBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Block, ImageBlock, TextBlock} from "../Blocks/block";
import {SlideData} from "./SlideData";
import {InputField} from "../Editor/Fields/InputField";
import {SlideMenuItem} from "./SlideMenuItem";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {CanvasBlockEditor} from "../Editor/CanvasBlockEditor";


interface SlideMenuProps {
    currentSlide: SlideData,
    updateSlide: (slideData: Partial<SlideData>) => void
    closeSlide: () => void,
    editedBlock?: Block,
    editBlock: (block: Block) => void,
    updateBlock: (id: string, blockData: Partial<Block>) => void,
    deleteBlock: (block: Block) => void,
    closeEditor: () => void
}

export const SlideMenu:React.FC<SlideMenuProps> = ({currentSlide, updateSlide, closeSlide, editedBlock, editBlock, updateBlock, deleteBlock, closeEditor}) => {
    const availableBlocks: Array<{icon: IconProp, block: Block}> = [{
        icon: "font",
        block: new TextBlock()
        }, {
        icon: "image",
        block: new ImageBlock()
        }
    ]

    return (
        <div className="slide-display--menu">
            <SlideMenuItem title='Slide Title' className="menu--item--title">
                <InputField value={currentSlide.title} onChange={(data) => updateSlide({title: data})} inputName='title'/>
            </SlideMenuItem>
            <SlideMenuItem title="Available Blocks" className="menu--item--available--blocks">
                {availableBlocks.map((info, k) => {
                    return (
                        <DraggableBlock key={`${info.block.type}-${k}`} block={info.block} classname="menu--item--available--block" type={DRAGGABLE_TYPE_NEW_BLOCK}>
                                <div className="icon"><FontAwesomeIcon icon={info.icon} /></div>
                                <div className="block--name">{info.block.displayName}</div>
                        </DraggableBlock>
                    )
                })}
            </SlideMenuItem>

            <SlideMenuItem title={`Slide Blocks (${currentSlide.blocks.length})`} className="menu--item--slide--blocks">
                {currentSlide.blocks.map(block => {
                    return (
                        <CanvasBlockEditor
                            key={block.id}
                            block={block}
                            edited={block === editedBlock}
                            editBlock={editBlock}
                            updateBlock={updateBlock}
                            deleteBlock={deleteBlock}
                            closeEditor={closeEditor}
                        />
                    )
                })}
            </SlideMenuItem>

            <div className="slide-display--menu--actions">
                <div className="slide-display--menu--actions--action slide-display--menu--actions--close" onClick={closeSlide}>
                    <FontAwesomeIcon icon={"times"} />
                </div>
            </div>
        </div>
    )
}