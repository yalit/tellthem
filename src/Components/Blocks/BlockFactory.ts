import {Block, BlockData, ImageBlock, TextBlock} from "./block";

const uniqid = require('uniqid')

export default function getBlock(data: BlockData): Block {
    let block: Block

    switch(data.type) {
        case 'text':
            block = new TextBlock()
            break;
        case 'img':
            block = new ImageBlock()
            break;
        default:
            throw new Error("No type defined for this block : "+ data.type)
    }

    if (data.id === '') data.id = uniqid()

    block.id = data.id !
    block.displayName = data.displayName
    block.position = data.position
    block.positionUnit = data.positionUnit
    block.width = data.width
    block.height = data.height
    block.sizeUnit = data.sizeUnit
    block._content = data._content

    return block
}