import {fireEvent, render, screen} from "@testing-library/react";
import TextEditor from "../../../../../Components/Editor/Editors/TextEditor";
import {getBlock} from "../../../../../Components/Blocks/block";


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
        const mock_onChangeFn = jest.fn()

        render(<TextEditor block={textBlock} onChange={mock_onChangeFn} onOpenSection={() => null} sections={{content: true}} />)
        const input = screen.getByRole('textbox', {name: 'content'})
        fireEvent.change(input, {target: {value: changedContent}})
        expect(mock_onChangeFn).toBeCalledTimes(1)
        expect(mock_onChangeFn).toBeCalledWith(textBlock.id, {_content: changedContent})
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

        const mock_openSectionFn = jest.fn()

        render(<TextEditor block={textBlock} onChange={() => null} onOpenSection={mock_openSectionFn} sections={{content: true}} />)
        const caret = screen.getByTestId(`switch-display-menu-item-content`)
        fireEvent.click(caret)
        expect(mock_openSectionFn).toBeCalledTimes(1)
        expect(mock_openSectionFn).toBeCalledWith({content: false})
    })

})

export {}