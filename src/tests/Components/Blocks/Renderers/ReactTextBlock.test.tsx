import ReactTextBlock from "../../../../Components/Blocks/Renderer/ReactTextBlock";
import {getBlock} from "../../../../Components/Blocks/block";
import {fireEvent, render, screen} from "@testing-library/react";
import {Block} from "../../../../Components/Blocks/block";
import {text} from "@fortawesome/fontawesome-svg-core";

let textBlock: Block | null = null

describe('React Text Block', () => {
    beforeEach(() => {
        textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })
    })
    test('React Text Block with default data', () => {
        const {container} = render(<ReactTextBlock block={textBlock!} className={"test-classname"}/>)

        const textDiv = container.getElementsByClassName("test-classname")
        expect(textDiv.length).toBe(1)
    })

    test('React Text Block clicked ok', () => {
        let clickedResult: Block | null = null;
        const onClick = (block: Block) => {clickedResult = block}

        const {container} = render(<ReactTextBlock block={textBlock!} className={"test-classname"}  onClick={onClick}/>)

        const textDiv = container.getElementsByClassName("test-classname")

        fireEvent.click(textDiv[0])
        expect(clickedResult).toBe(textBlock)
    })

    test('React Text Block has correct block style', () => {
        const {container} = render(<ReactTextBlock block={textBlock!} className={"test-classname"} />)

        const textDiv: HTMLCollectionOf<Element> = container.getElementsByClassName("test-classname")
        const element = textDiv[0] as HTMLDivElement

        expect(element.style['position']).toBe("absolute")
        expect(element.style['top']).toBe("15mm")
        expect(element.style['left']).toBe("15mm")
        expect(element.style['height']).toBe("50px")
        expect(element.style['width']).toBe("10px")
    })

    test('React Text Block has correct additional style', () => {
        const {container} = render(<ReactTextBlock block={textBlock!} className={"test-classname"} style={{fontSize: "2rem"}} />)

        const textDiv: HTMLCollectionOf<Element> = container.getElementsByClassName("test-classname")
        const element = textDiv[0] as HTMLDivElement

        expect(element.style['fontSize']).toBe("2rem")
    })
})