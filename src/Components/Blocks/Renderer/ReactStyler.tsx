import React from "react";
import {Block} from "../block";


export default function getStyle(block: Block):React.CSSProperties {
    return {
        position: "absolute",
        top: block.position.y+block.positionUnit,
        left: block.position.x+block.positionUnit,
        width: block.size.width+block.sizeUnit,
        height: block.size.height+block.sizeUnit
    }
}