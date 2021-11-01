import React from "react";
import {Block} from "../block";


export class ReactStyler {
    getStyle(block: Block):React.CSSProperties {
        return {
            position: "absolute",
            top: block.position.y+block.positionUnit,
            left: block.position.x+block.positionUnit,
            width: block.width+block.sizeUnit,
            height: block.height+block.sizeUnit
        }
    }
}