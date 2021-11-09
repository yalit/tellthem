import {fireEvent, render, screen} from "@testing-library/react";
import {TextEditor} from "../../../../Components/Editor/Editors/TextEditor";
import {BlockData, getBlock} from "../../../../Components/Blocks/block";

describe('Text Editor', () => {

    test('default render only title and no input', () => {
        const textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })

        render(<TextEditor block={textBlock} onChange={() => null} onOpenSection={() => null} sections={{}} />)

        expect(screen.getByText(/content/i)).not.toBeNull()

        expect(() => {
            screen.getByRole('textbox')
        }).toThrowError()
    })

    test('render with content section open reveals input', () => {
        const textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })

        render(<TextEditor block={textBlock} onChange={() => null} onOpenSection={() => null} sections={{content: true}} />)
        expect(screen.getByRole('textbox', {name: "content"})).not.toBeNull()
    })

    test('Content onChange is triggered', () => {
        const textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })

        let changedContent:string = "New Content"
        const changeFn = jest.fn((id: string, data: Partial<BlockData>) => {
            expect(id).toBe(textBlock.id)
            expect(data).toStrictEqual({_content: changedContent})
        })

        render(<TextEditor block={textBlock} onChange={changeFn} onOpenSection={() => null} sections={{content: true}} />)
        const input = screen.getByRole('textbox', {name: 'content'})
        fireEvent.change(input, {target: {value: changedContent}})
        expect(changeFn).toBeCalledTimes(1)
    })


    test('Content onOpenSection is triggered', () => {
        const textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })

        const openSectionFn = jest.fn((sectionStatus: {[key: string]: boolean}) => {
            expect(sectionStatus).toStrictEqual({content: false})
        })

        render(<TextEditor block={textBlock} onChange={() => null} onOpenSection={openSectionFn} sections={{content: true}} />)
        const caret = screen.getByTestId(`switch-display-menu-item-content`)
        fireEvent.click(caret)
        expect(openSectionFn).toBeCalledTimes(1)
    })

})

export {}