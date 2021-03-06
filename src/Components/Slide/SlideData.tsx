import {TemplateData} from "../../Helpers/TemplateData";
import {Block} from "../Blocks/block";
import getBlock from "../Blocks/BlockFactory";

const uniqid = require('uniqid');

export type SlideProps = Readonly<{
    title: string,
    description?: string
    template?: TemplateData,
    blocks: Block[]
}>

export class SlideData {
    id: string;
    title: string
    description: string | undefined
    template: TemplateData | undefined
    blocks: Block[] = []

    constructor(data: Partial<SlideProps>){
        this.id = uniqid();
        this.title = data.title ?? '';
        this.description = data.description
        this.template = data.template
    }
}

export function createSlide(data: Partial<SlideProps>): SlideData {
    let slideData = new SlideData(data)

    if (data.blocks) {
        slideData = {...slideData, blocks: data.blocks.map(blockData => getBlock(blockData))}
    }

    return slideData
}