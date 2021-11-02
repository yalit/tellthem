/**
 * Generic Block model ==> not to be used as-is but must be extended for Specific Blocks
 */
import {renderArgs, Renderer} from "./Renderer/rendererInterface";
import {TextRenderer} from "./Renderer/TextRenderer";
import {ImageRenderer} from "./Renderer/ImageRenderer";

const uniqid = require('uniqid')

export interface BlockPosition {
    x: number,
    y: number
}

/**
 * TODO : automatic update of the name at the creation (like in Excel or Powerpoint)?
 */
export interface BlockData {
    id?: string ,
    type: Readonly<string>,
    displayName: string,
    position: BlockPosition,
    positionUnit: 'px' | 'mm' | '%',
    width: number, //% by default
    height: number , //% by default
    sizeUnit: 'px' | 'mm' | '%',
    _content: any,
    renderers: Array<Renderer>,
}

export class Block {
    id: string = uniqid()
    type: Readonly<string> = ''
    displayName: string = ''
    position: BlockPosition = {x: 0, y:0} //px by default
    positionUnit: 'px' | 'mm' | '%' = '%'
    width: number = 10 //% by default
    height: number = 10 //% by default
    sizeUnit: 'px' | 'mm' | '%' = '%'
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
        let renderers: Renderer[] = this.renderers.filter(r => r.supports(type))

        if (renderers.length === 0) return null

        else return renderers[0]
    }

    addRenderer(renderer: Renderer): Block {
        this.renderers.push(renderer)
        return this
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
        this.displayName = 'Text'
        this._content = content
        this.renderers = [new TextRenderer()]
    }
}

export class ImageBlock extends Block {
    _content: string = ''
    alt: string = ''
    type = 'img'

    constructor() {
        super();
        this.displayName = 'Image'
        this._content = ''
        this.renderers = [new ImageRenderer()]
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
