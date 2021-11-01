/**
 * Generic Block model ==> not to be used as-is but must be extended for Specific Blocks
 */
import {renderArgs, Renderer} from "../renderers/rendererInterface";
import {TextReactRenderer} from "../renderers/react/TextReactRenderer";
import {ImageReactRenderer} from "../renderers/react/ImageReactRenderer";
const uniqid = require('uniqid')

export interface BlockPosition {
    x: number,
    y: number
}

export class Block {
    id: string = uniqid()
    name: string = ''
    type: Readonly<string> = ''
    displayName: string = ''
    position: BlockPosition = {x: 0, y:0} //px by default
    positionUnit: 'px' | 'mm' | '%' = 'px'
    width: number = 100 //px by default
    height: number = 35 //px by default
    sizeUnit: 'px' | 'mm' = 'px'
    _content: any
    renderers: Array<Renderer> = []

    set content(content: string) {
        this._content = content
    }

    get content(): any {
        return this._content
    }

    /**
     * Render the block for a specific rendering
     * @param type
     * @param args
     */
    render(type: string, args: renderArgs) {
        const renderer = this.getRenderer(type)

        if (renderer === null) {
            throw new Error("No renderer existing for this Block and Type")
        }

        return renderer.render(this, args)
    }

    getRenderer(type: string): Renderer | null {
        let renderer: Renderer | null = null
        this.renderers.forEach(tempRenderer => {
            if (renderer === null && tempRenderer.supports(type)) {
                renderer = tempRenderer
            }
        })

        return renderer
    }

    addRenderer(renderer: Renderer): Block {
        this.renderers.push(renderer)
        return this
    }

    /**
     * @private
     */
    private renderAsDom(args: renderArgs) {
        return this.render('dom', args)
    }

    /**
     * @private
     */
    private renderAsReact(args: renderArgs) {
        return this.render('react', args)
    }
}


export class TextBlock extends Block {
    _content: string = ''
    type = 'text'

    constructor(content: string = '') {
        super();
        this.name = 'text'
        this.displayName = 'Text Block'
        this._content = content
        this.renderers = [new TextReactRenderer()]
    }
}

export class ImageBlock extends Block {
    _content: string = ''
    alt: string = ''
    type = 'img'

    constructor() {
        super();
        this.name = 'img'
        this.displayName = 'Image Block'
        this._content = ''
        this.renderers = [new ImageReactRenderer()]
    }

    set content(content: string) {
        throw new Error('Use async ImageBlock.setContentFromImage methods')
    }

    get content() {
        return this._content
    }

    /**
     * Async load of the base64 from an Image
     * @async
     * @param file
     */
    setContentFromImage(file: File): Promise<Block> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            let block = this
            reader.onloadend = function() {
                const data = reader.result as string
                if (data.split('/')[0] === 'data:image'){
                    block._content = reader.result as string
                    resolve(block)
                }
                reject("File is not an image")
            }
            reader.onerror = () => reject(new Error("File not readable"))

            reader.readAsDataURL(file);
        })
    }
}

