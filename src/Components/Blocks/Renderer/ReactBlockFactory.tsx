import {Block, BLOCK_TYPE_TEXT} from "../block";
import React, {ForwardedRef} from "react";
import ReactTextBlock from "./ReactTextBlock";

export type renderArgs = {
    block: Block
    /**
     * The class that you want to apply to the outer rendered div
     */
    className?: string,

    /**
     * The style that you want to apply to the outer rendered div
     */
    style?: {}

    /**
     * onClick handler
     */
    onClick?: (block: Block) => void
}

const ReactBlockFactory = React.forwardRef<Element, renderArgs>((props, ref) => {
    switch (props.block.type) {
        case BLOCK_TYPE_TEXT:
            return <ReactTextBlock {...props} ref={ref as ForwardedRef<HTMLDivElement>}/>
        default:
            return <div className="error">No block defined for this type of block</div>
    }
})

export default ReactBlockFactory