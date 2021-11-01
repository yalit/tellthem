import {Block, ImageBlock, TextBlock} from "./models/block";
import {renderArgs} from "./renderers/rendererInterface";

export const availableBlocks: Array<Block> = [
    new TextBlock(),
    new ImageBlock()
]

export default class Blockify {
    private _blocks: Array<Block> = availableBlocks

    get blocks() {
        return this._blocks
    }

    /**
     * Add a customized Block : must extend Block class
     * @param newBlock: Block
     */
    addBlock(newBlock: Block): Blockify {
        this._blocks.push(newBlock)
        return this
    }

    renderAsReact(blocks: Block[] | Block, args: renderArgs): Array<any> {
        return this.render(blocks, 'react', args)
    }

    renderAsDom(blocks: Block[] | Block, args: renderArgs): Array<any> {
        return this.render(blocks, 'dom', args)
    }

    render(blocks: Block[] | Block, type: string, args: renderArgs) {
        if (blocks instanceof Block) return blocks.render(type, args)

        return blocks.map(block => block.render(type, args))
    }
}