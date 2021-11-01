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

    /**
     * id to be appended at the end of key
     */
    id?: string

    /**
     * onClick handler
     */
    handleBlock?: (block: Block, action?: string) => void
}

export interface Renderer {
    supports(type: string): boolean
    render(block: Block, args: renderArgs): any
}