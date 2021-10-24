import {TextBlock} from "../../models/block";
import {ReactElement} from "react";
import {renderArgs, Renderer} from "../rendererInterface";

export class TextReactRenderer implements Renderer {
    supports(type: string): boolean {
        return type === 'react'
    }

    render(block: TextBlock, args: renderArgs): ReactElement {
        return <div className={args.class ?? ''} style={args.style ?? {}}>{block.content}</div>
    }
}