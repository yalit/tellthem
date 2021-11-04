/**
 * Generic Block model ==> not to be used as-is but must be extended for Specific Blocks
 */

const uniqid = require('uniqid')

export interface BlockPosition {
    x: number,
    y: number
}

export interface BlockSize {
    width: number,
    height: number
}

export const BLOCK_TYPE_TEXT = 'text'
export const BLOCK_TYPE_IMAGE = 'img'

type AvailableBlock = 'text' | 'img' | ''


/**
 * TODO : automatic update of the name at the creation (like in Excel or Powerpoint)?
 */
export interface BlockData {
    id?: string,
    type: Readonly<AvailableBlock>,
    displayName: string,
    position: BlockPosition,
    positionUnit: 'px' | 'mm' | '%',
    size: BlockSize,
    sizeUnit: 'px' | 'mm' | '%',
    _content: any,
}

export class Block {
    id: string = ''
    type: Readonly<AvailableBlock> = ''
    displayName: string = ''
    position: BlockPosition = {x: 0, y:0} //px by default
    positionUnit: 'px' | 'mm' | '%' = '%'
    size: BlockSize = {width: 10, height: 10}
    sizeUnit: 'px' | 'mm' | '%' = '%'
    _content: any

    set content(content: string) {
        this._content = content
    }

    get content(): any {
        return this._content
    }
}


export class TextBlock extends Block {
    _content: string = ''
    type: Readonly<AvailableBlock> = BLOCK_TYPE_TEXT

    constructor(content: string = '') {
        super();
        this.displayName = 'Text'
        this._content = content
    }
}

export class ImageBlock extends Block {
    _content: string = ''
    alt: string = ''
    type: Readonly<AvailableBlock> = BLOCK_TYPE_IMAGE

    constructor() {
        super();
        this.displayName = 'Image'
        this._content = ''
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
