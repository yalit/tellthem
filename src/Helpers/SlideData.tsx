import {SlideBlock} from "./SlideBlock";
import {TemplateData} from "./TemplateData";

const uniqid = require('uniqid');

export type SlideProps = Readonly<{
    title: string,
    description?: string
    template?: TemplateData,
    blocks: SlideBlock[]
}>

export class SlideData {
    id: string;
    title: string
    description: string | undefined
    template: TemplateData | undefined
    blocks: SlideBlock[] = []

    constructor(data: Partial<SlideProps>){
        this.id = uniqid();
        this.title = data.title ?? '';
        this.description = data.description
        this.template = data.template
    }
}

export function createSlide(data: Partial<SlideProps>): SlideData {
    return new SlideData(data)
}