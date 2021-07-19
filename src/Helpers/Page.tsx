const uniqid = require('uniqid');

export type PageProps = Readonly<{
    title: string,
    img: string,
    description?: string
}>

export class Page {
    id: string;
    title: string
    img: string
    description: string | undefined

    constructor(data: PageProps){
        this.id = uniqid();
        this.title = data.title;
        this.img = data.img
        this.description = data.description
    }
}

export function createPage(data: PageProps): Page {
    return new Page(data)
}