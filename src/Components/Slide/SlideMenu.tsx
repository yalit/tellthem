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
    updateBlock: (id: string, blockData: Partial<Block>) => void,
    deleteBlock: (block: Block) => void,
    closeEditor: () => void
}

export const SlideMenu:React.FC<SlideMenuProps> = ({currentSlide, updateSlide, closeSlide, editedBlock, updateBlock, deleteBlock, closeEditor}) => {
    const availableBlocks: Array<{icon: IconProp, block: Block}> = [{
        icon: "font",
        block: new TextBlock()
        }, {
        icon: "image",
        block: new ImageBlock()
        }
    ]

    /**
     * TODO : list all the blocks and allow their edition directly by clicking on them in the menu
     * TODO : add an overflow auto on the fix height menu
     * TODO : add a padding bottom of the height of the action menu
     */

    return (
        <div className="slide-display--menu">
            <SlideMenuItem title='Slide Title' className="menu--item--title">
                <InputField value={currentSlide.title} onChange={(data) => updateSlide({title: data})} inputName='title'/>
            </SlideMenuItem>
            <SlideMenuItem title="Available Blocks" className="menu--item--blocks">
                {availableBlocks.map(info => {
                    return (
                        <DraggableBlock key={info.block.id} block={info.block} classname="menu--item--available--block" type={DRAGGABLE_TYPE_NEW_BLOCK}>
                                <div className="icon"><FontAwesomeIcon icon={info.icon} /></div>
                                <div className="block--name">{info.block.displayName}</div>
                        </DraggableBlock>
                    )
                })}
            </SlideMenuItem>

            {editedBlock !== undefined ?
                <CanvasBlockEditor
                    block={editedBlock!}
                    updateBlock={updateBlock}
                    deleteBlock={deleteBlock}
                    closeEditor={closeEditor}
                /> :''
            }

            <div className="slide-display--menu--actions">
                <div className="slide-display--menu--actions--action slide-display--menu--actions--close" onClick={closeSlide}>
                    <FontAwesomeIcon icon={"times"} />
                </div>
            </div>
        </div>
    )
}