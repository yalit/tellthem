import {Block, BlockData, getBlock, ImageBlock, TextBlock} from "../../../Components/Blocks/block";


const fs = require('fs')
const path = require('path');

describe('Text Block test', () => {
    test('Text Block created empty with name input used', () => {
        const block = new TextBlock()
        expect(block.type).toBe('text')
    });

    test('Text Block created empty with displayName input used', () => {
        const block = new TextBlock()
        expect(block.displayName).toBe('Text')
    });

    test('Text Block created empty', () => {
        const block = new TextBlock()
        expect(block.content).toBe('')
    });

    test('Text Block created with content', () => {
        const testContent = 'A specific test content'
        const block = new TextBlock(testContent)
        expect(block.content).toBe(testContent)
    });
})

describe('Image Block test', () => {
    test('Image Block created empty with name input used', () => {
        const block = new ImageBlock()
        expect(block.type).toBe('img')
    });

    test('ImageBlock created empty with displayName input used', () => {
        const block = new ImageBlock()
        expect(block.displayName).toBe('Image')
    });

    test('Image Block created empty', () => {
        const block = new ImageBlock()
        expect(block.content).toBe('')
    });

    test('Image Block set content not possible', () => {
        const block = new ImageBlock()
        expect(() => {
            block.content = 'Contenu incorrect'
        }).toThrow('Use async ImageBlock.setContentFromImage methods')
    })

    test('Image Block set content from an image which is not an image', () => {
        const block = new ImageBlock()
        let image = new File(["CONTENT"], './fixtures/test_not_an_image.txt')

        expect.assertions(1)
        return block.setContentFromImage(image)
            // eslint-disable-next-line jest/no-conditional-expect
            .catch((error) => expect(error).toBe("File is not an image"))
    })

    test('Image Block set content from an image which is an image', () => {
        const block = new ImageBlock()
        const file = new File([fs.readFileSync(path.join(__dirname, '/fixtures/test_image.jpg'))] , 'js_test_image.jpg', {type: 'image/jpeg'})

        expect.assertions(2)
        return block.setContentFromImage(file)
            .then((data: Block) => {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(data).toBe(block)
                // eslint-disable-next-line jest/no-conditional-expect
                expect(data.content).not.toBe('')
            })
            .catch(err => {
                throw err
            })
    })
})

describe("Block Factory : getBlock", () => {

    test('Text Block correct getter without id', () => {
        let blockData: BlockData = {
            displayName: 'Text Block',
            type: 'text',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content"
        }

        const block = getBlock(blockData)

        expect(block.id).not.toBeNull()
        expect(block.type).toBe('text')
        expect(block.displayName).toBe('Text Block')
        expect(block.size.width).toBe(10)
        expect(block.size.height).toBe(50)
        expect(block.sizeUnit).toBe('px')
        expect(block.position.x).toBe(15)
        expect(block.position.y).toBe(15)
        expect(block.positionUnit).toBe('mm')
        expect(block._content).toBe('A super content')
    })

    test('Text Block correct getter with id', () => {
        let blockData: BlockData = {
            id: "ID-001",
            displayName: 'Text Block',
            type: 'text',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content",
        }

        const block = getBlock(blockData)

        expect(block.id).toBe("ID-001")
    })

    test('Image Block correct getter without ID', () => {
        let blockData: BlockData = {
            displayName: 'Image Block',
            type: 'img',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content",
        }

        const block = getBlock(blockData)

        expect(block.id).not.toBeNull()
        expect(block.type).toBe('img')
        expect(block.displayName).toBe('Image Block')
    })

    test('Image Block correct getter with ID', () => {
        let blockData: BlockData = {
            id: "ID-001",
            displayName: 'Image Block',
            type: 'img',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content",
        }

        const block = getBlock(blockData)

        expect(block.id).toBe("ID-001")
    })

    test('Get Block with incorrect type throws error', () => {
        let blockData: BlockData = {
            id: "ID-001",
            displayName: 'Image Block',
            type: '',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm",
            _content: "A super content",
        }

        expect(() => {
            getBlock(blockData)
        }).toThrowError("No type defined for this block : ")
    })
})


