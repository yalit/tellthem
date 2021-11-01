import {Block} from "../Components/Blocks/block";

const uniqid = require('uniqid');

export type TemplateProps = Readonly<{
    name: string,
    description: string,
    blocks : Block[]
}>

export class TemplateData {
    id: string;
    name: string = ''
    description: string | undefined
    blocks: Block[] = []

    constructor(data: Partial<TemplateProps>){
        this.id = uniqid();
        this.name = data.name ?? ''
        this.description = data.description ?? ''
        this.blocks = data.blocks ?? []
    }
}

export function createTemplateData(data: TemplateProps): TemplateData {
    return new TemplateData(data)
}