import {TextBlock} from "../../models/block";
import {ReactElement} from "react";
import {renderArgs, Renderer} from "../rendererInterface";
import {ReactStyler} from "./ReactStyler";

export class TextReactRenderer implements Renderer {
    reactStyler: ReactStyler = new ReactStyler()

    supports(type: string): boolean {
        return type === 'react'
    }

    render(block: TextBlock, args: renderArgs): ReactElement {
        const blockStyle = this.reactStyler.getStyle(block)
        return <div className={args.class ?? ''} style={{...blockStyle, ...args.style}}>{block.content}</div>
    }
}