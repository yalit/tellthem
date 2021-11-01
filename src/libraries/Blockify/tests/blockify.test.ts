import Blockify, {availableBlocks} from "../blockify";
import {Block} from "../models/block";

describe('Blockify testing', () => {
    test('Blockify create contains initialized Blocks', () => {
        const blockify = new Blockify()
        expect(blockify.blocks.length).toBeGreaterThan(0)
        expect(blockify.blocks).toBe(availableBlocks)
    })

    test('addition of a new correct block', () => {
        class ExtendedBlock extends Block {
            name: string = 'extended Block'
        }

        const block = new ExtendedBlock()
        const blockify = new Blockify()
        const blockLength = blockify.blocks.length
        blockify.addBlock(block)

        expect(blockify.blocks.length).toBe(blockLength + 1)
        expect(blockify.blocks).toContain(block)
    })
})