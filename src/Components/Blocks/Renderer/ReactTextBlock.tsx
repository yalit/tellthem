import React from "react";
import {renderArgs} from "./ReactBlockFactory";
import getStyle from "./ReactStyler";

const ReactTextBlock =  React.forwardRef<HTMLDivElement, renderArgs> ((props, ref) => {
    const clickBlock = () => {
        if (!props.onClick) return
        props.onClick(props.block)
    }

    const getBlockStyle = () => {
        return getStyle(props.block)
    }

    return (
        <div ref={ref} className={props.className ?? ''}
             style={{...getBlockStyle(), ...props.style}}
             onClick={clickBlock}
        >
            {props.block.content}
        </div>
    )
})

export default ReactTextBlock