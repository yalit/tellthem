import {ImageBlock} from "../block";
import {ReactElement} from "react";
import {renderArgs, Renderer} from "./rendererInterface";

export class ImageReactRenderer implements Renderer {
    supports(type: string): boolean {
        return type === 'react'
    }

    render(block: ImageBlock, args: renderArgs): ReactElement {
        return <img src={block.content} className={args.class} alt={block.alt}/>
    }
}