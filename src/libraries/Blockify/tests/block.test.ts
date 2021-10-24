import {Block, ImageBlock, TextBlock} from "../models/block";
import {TextReactRenderer} from "../renderers/react/TextReactRenderer";


const fs = require('fs')
const path = require('path');

describe('Block test', () => {

    test('empty renderers at creation', () => {
        const block = new Block()
        expect(block.renderers).toHaveLength(0)
    })

    test('getRenderer returns null if no renderer at all', () => {
        const block = new Block();
        expect(block.getRenderer('any')).toBe(null)
    })

    test('addRenderer adds correctly a renderer', () => {
        const block = new Block();
        const renderer = new TextReactRenderer()
        block.addRenderer(renderer)

        expect(block.renderers).toHaveLength(1)
        expect(block.renderers[0]).toBe(renderer)
    })

    test('getRenderer returns null if no renderer matching', () => {
        const block = new Block();
        const renderer = new TextReactRenderer()
        block.addRenderer(renderer)
        expect(block.getRenderer('any')).toBe(null)
    })

    test('getRenderer returns renderer when matching', () => {
        const block = new Block();
        const renderer = new TextReactRenderer()
        block.addRenderer(renderer)
        expect(block.getRenderer('react')).toBe(renderer)
    })
})

describe('Text Block test', () => {
    test('Text Block created empty with name input used', () => {
        const block = new TextBlock()
        expect(block.name).toBe('text')
    });

    test('Text Block created empty with displayName input used', () => {
        const block = new TextBlock()
        expect(block.displayName).toBe('Text Block')
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
        expect(block.name).toBe('img')
    });

    test('ImageBlock created empty with displayName input used', () => {
        const block = new ImageBlock()
        expect(block.displayName).toBe('Image Block')
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


