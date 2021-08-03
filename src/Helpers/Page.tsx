const uniqid = require('uniqid');

export type PageData = Readonly<{
    title: string,
    img: string,
    description?: string
}>

export class Page {
    id: string;
    title: string
    img: string
    description: string | undefined

    constructor(data: PageData){
        this.id = uniqid();
        this.title = data.title
        this.img = data.img
        this.description = data.description
    }
}

export function createPage(data: PageData): Page {
    return new Page(data)
}

export function editPage(page:Page, data: PageData): Page {
    page.title = data.title
    page.description = data.description
    if (data.img) {
        page.img = data.img
    }
    return page;
}