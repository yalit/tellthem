import React, {LegacyRef} from "react";
import {ReactStyler} from "./ReactStyler";
import {renderArgs} from "./ReactBlockFactory";

const ReactTextBlock =  React.forwardRef<HTMLDivElement, renderArgs> ((props, ref) => {
    const clickBlock = () => {
        if (!props.onClick) return
        props.onClick(props.block)
    }

    const getStyle = () => {
        const reactStyler: ReactStyler = new ReactStyler()

        return reactStyler.getStyle(props.block)
    }

    return (
        <div ref={ref} className={props.className ?? ''}
             style={{...getStyle(), ...props.style}}
             onClick={clickBlock}
        >
            {props.block.content}
        </div>
    )
})

export default ReactTextBlock