import {render, screen} from "@testing-library/react";
import {CommonEditorFields} from "../../../../Components/Editor/Editors/CommonEditorFields";
import {getBlock} from "../../../../Components/Blocks/block";

describe('Common Editor Fields basic functionalities', () => {
    beforeEach(() => {
        const textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })
        render(<CommonEditorFields block={textBlock} onChange={() => null} onOpenSection={() => null} sections={{}} />)
    })


    test('Correct number of menu items', () => {
        const titles = document.getElementsByClassName('slide-display--menu--item--title')
        expect(titles).toHaveLength(2)

        expect(screen.getAllByText(/name/i)).toHaveLength(1)
        expect(screen.getAllByText(/size/i)).toHaveLength(1)
    })

    test('No display of name menu item inside', () => {
        expect(() => {
            screen.getByRole('input', {name: 'name'})
        }).toThrowError()
    })

    test('No display of size menu item inside', () => {
        const size_items = document.getElementsByClassName('menu--editor--data--item--title')
        expect(size_items).toHaveLength(0)
    })
})

describe('Common Editor fields displays menu item', ()=> {
    test('displays name section', () => {
        const textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })
        render(<CommonEditorFields block={textBlock} onChange={() => null} onOpenSection={() => null} sections={{name: true}} />)

        expect(screen.getByRole('textbox', {name: 'name'})).not.toBeNull()
    })

    test('displays size section', () => {
        const textBlock = getBlock({
            type: 'text',
            _content: "A text",
            displayName: 'Text Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })
        render(<CommonEditorFields block={textBlock} onChange={() => null} onOpenSection={() => null} sections={{size: true}} />)

        expect(screen.getByRole('slider', {name: 'width'})).not.toBeNull()
        expect(screen.getByRole('slider', {name: 'height'})).not.toBeNull()
    })
})

export {}