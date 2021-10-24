import {Block} from "../models/block";

export type renderArgs = {
    /**
     * The class that you want to apply to the outer rendered div
     */
    class?: string,

    /**
     * The style that you want to apply to the outer rendered div
     */
    style?: {}
}

export interface Renderer {
    supports(type: string): boolean
    render(block: Block, args: renderArgs): any
}