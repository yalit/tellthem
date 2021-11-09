import {getBlock} from "../../../../Components/Blocks/block";
import getStyle from "../../../../Components/Blocks/Renderer/ReactStyler";

describe('React Styler testing', () => {
    test('get Style position', ()=> {
        const block = getBlock({
            displayName: 'Text Block',
            type: 'text',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 25, y:15},
            positionUnit: "mm",
            _content: "A super content"
        })

        const style = getStyle(block)
        expect(style.position).toBe('absolute')
        expect(style.top).toBe('15mm')
        expect(style.left).toBe('25mm')
        expect(style.width).toBe('10px')
        expect(style.height).toBe('50px')
    })
})

export {}