import {fireEvent, render, screen} from "@testing-library/react";
import {CommonEditorFields} from "../../../../../Components/Editor/Editors/CommonEditorFields";
import {getBlock} from "../../../../../Components/Blocks/block";

const testBlock = getBlock({
    id: "",
    type: 'text',
    _content: "A text",
    displayName: 'Text Block',
    size: {width: 10, height: 50},
    sizeUnit: "px",
    position: {x: 15, y:15},
    positionUnit: "mm"
})

describe('Common Editor fields displays menu item', ()=> {
    test('displays name section with correct input', () => {
        render(<CommonEditorFields block={testBlock} onChange={() => null} onOpenSection={() => null} sections={{name: true}} />)

        expect(screen.getByRole('textbox', {name: 'name'})).not.toBeNull()
    })

    test('ensure onChange is triggered', () => {
        const onChange = jest.fn()

        render(<CommonEditorFields block={testBlock} onChange={onChange} onOpenSection={() => null} sections={{name: true}} />)
        const name_input = screen.getByRole('textbox', {name: 'name'})
        fireEvent.change(name_input, {target: {value: "New Content"}})
        expect(onChange).toBeCalledTimes(1)
        expect(onChange).toBeCalledWith(testBlock.id, {displayName: "New Content"})
    })

    test('displays size section', () => {
        render(<CommonEditorFields block={testBlock} onChange={() => null} onOpenSection={() => null} sections={{size: true}} />)

        expect(screen.getByRole('slider', {name: 'width'})).not.toBeNull()
        expect(screen.getByRole('slider', {name: 'height'})).not.toBeNull()
    })
})

export {}