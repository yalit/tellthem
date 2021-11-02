import {TextBlock} from "../block";
import {ReactElement} from "react";
import {renderArgs, Renderer} from "./rendererInterface";
import {ReactStyler} from "./ReactStyler";

export class TextRenderer implements Renderer {
    reactStyler: ReactStyler = new ReactStyler()

    supports(type: string): boolean {
        return type === 'react'
    }

    render(block: TextBlock, args: renderArgs): ReactElement {
        const blockStyle = this.reactStyler.getStyle(block)

        const clickBlock = () => {
            if (!args.onClick) return
            args.onClick(block)
        }

        return <div key={block.id+'-'+args.id} className={args.class ?? ''} style={{...blockStyle, ...args.style}} onClick={clickBlock}>{block.content}</div>
    }
}