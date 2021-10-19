const uniqid = require('uniqid');

export type SlideProps = Readonly<{
    title: string,
    description?: string
    template: string
}>

export class SlideData {
    id: string;
    title: string
    description: string | undefined
    template: string

    constructor(data: SlideProps){
        this.id = uniqid();
        this.title = data.title;
        this.description = data.description
        this.template = data.template
    }
}

export function createSlide(data: SlideProps): SlideData {
    return new SlideData(data)
}