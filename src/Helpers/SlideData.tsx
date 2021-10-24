import {TemplateData} from "./TemplateData";
import {Slide} from "@material-ui/core";
import {SlideBlock} from "./SlideBlock";

const uniqid = require('uniqid');

export type SlideProps = Readonly<{
    title: string,
    description?: string
    template?: string,
    blocks: SlideBlock[]
}>

export class SlideData {
    id: string;
    title: string
    description: string | undefined
    template: string | undefined
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