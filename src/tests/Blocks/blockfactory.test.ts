import getBlock from "../../Components/Blocks/BlockFactory";
import {BlockData} from "../../Components/Blocks/block";

describe("Block Factory", () => {

    test('Text Block correct getter without id', () => {
        let blockData: BlockData = {
            name: 'text',
            displayName: 'Text Block',
            type: 'text',
            width: 10,
            height: 50,
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content"
        }

        const block = getBlock(blockData)

        expect(block.id).not.toBeNull()
        expect(block.type).toBe('text')
        expect(block.name).toBe('text')
        expect(block.displayName).toBe('Text Block')
        expect(block.width).toBe(10)
        expect(block.height).toBe(50)
        expect(block.sizeUnit).toBe('px')
        expect(block.position.x).toBe(15)
        expect(block.position.y).toBe(15)
        expect(block.positionUnit).toBe('mm')
        expect(block._content).toBe('A super content')
    })

    test('Text Block correct getter with id', () => {
        let blockData: BlockData = {
            id: "ID-001",
            name: 'text',
            displayName: 'Text Block',
            type: 'text',
            width: 10,
            height: 50,
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content"
        }

        const block = getBlock(blockData)

        expect(block.id).toBe("ID-001")
    })

    test('Image Block correct getter without ID', () => {
        let blockData: BlockData = {
            name: 'img',
            displayName: 'Image Block',
            type: 'img',
            width: 10,
            height: 50,
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content"
        }

        const block = getBlock(blockData)

        expect(block.id).not.toBeNull()
        expect(block.type).toBe('img')
        expect(block.name).toBe('img')
        expect(block.displayName).toBe('Image Block')
    })

    test('Image Block correct getter with ID', () => {
        let blockData: BlockData = {
            id: "ID-001",
            name: 'img',
            displayName: 'Image Block',
            type: 'img',
            width: 10,
            height: 50,
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content"
        }

        const block = getBlock(blockData)

        expect(block.id).toBe("ID-001")
    })
})