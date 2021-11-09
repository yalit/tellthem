import {Block} from "../Blocks/block";
import {getBlock} from "../Blocks/block";

const uniqid = require('uniqid');

export type SlideProps = Readonly<{
    title: string,
    description?: string
    blocks: Block[]
}>

export class SlideData {
    id: string;
    title: string
    description: string | undefined
    blocks: Block[] = []

    constructor(data: Partial<SlideProps>){
        this.id = uniqid();
        this.title = data.title ?? '';
        this.description = data.description
    }
}

export function createSlide(data: Partial<SlideProps>): SlideData {
    let slideData = new SlideData(data)

    if (data.blocks) {
        slideData = {...slideData, blocks: data.blocks.map(blockData => getBlock(blockData))}
    }

    return slideData
}