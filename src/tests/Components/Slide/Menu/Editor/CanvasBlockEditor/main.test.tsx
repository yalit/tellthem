import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import CanvasBlockEditor from "../../../../../../Components/Slide/Menu/Editor/CanvasBlockEditor";
import {getBlock} from "../../../../../../Components/Blocks/block";

const testBlock = getBlock({
    id: '',
    type: 'text',
    _content: "A text",
    displayName: 'Text Block',
    size: {width: 10, height: 50},
    sizeUnit: "px",
    position: {x: 15, y:15},
    positionUnit: "mm"
})

const mock_editBlockFn = jest.fn()
const mock_deleteBlockFn = jest.fn()
const mock_closeEditorFn = jest.fn()

const getFaButton = (parentClassName: string, faClass: string) => {
    const buttonParent = document.getElementsByClassName(parentClassName)
    const buttonFaList = Array.from(buttonParent[0].children).filter(child => child.classList.contains(faClass) && child.tagName === 'svg')

    return buttonFaList[0]
}

describe('Canvas Block Editor - Generic', () => {
    beforeEach(() => {
        render(<CanvasBlockEditor block={testBlock} edited={false} editBlock={() => null} updateBlock={() => null} deleteBlock={() => null} closeEditor={() => null} />)
    })

    test('Generic block renders contains block Id and displayname', () => {
        expect(screen.getByText(`${testBlock.displayName} - ${testBlock.id}`)).not.toBeNull()
    })

    test('Generic block renders to be edited', () => {
        const editFaList = document.getElementsByClassName('menu--editor--actions--edit')
        expect(editFaList.length).toBe(1)

        const editFaChildren = Array.from(editFaList[0].children)
        expect(editFaChildren.filter(child => child.classList.contains('fa-edit') && child.tagName === 'svg')).toHaveLength(1)
    })
})

describe('Canvas Block Editor - edit button interaction', ()=> {
    test('Generic block onclick on edit button, editblock function triggered', () => {
        render(<CanvasBlockEditor block={testBlock} edited={false} editBlock={mock_editBlockFn} updateBlock={() => null} deleteBlock={() => null} closeEditor={() => null} />)
        const editFaButton = getFaButton('menu--editor--actions--edit', 'fa-edit')

        fireEvent.click(editFaButton)
        expect(mock_editBlockFn).toBeCalledTimes(1)
        expect(mock_editBlockFn).toBeCalledWith(testBlock)
    })
})

describe('Canvas Block Editor - edited', () => {
    beforeEach(() => {
        render(<CanvasBlockEditor block={testBlock} edited={true} editBlock={() => null} updateBlock={() => null} deleteBlock={mock_deleteBlockFn} closeEditor={mock_closeEditorFn} />)
    })

    test('when edited - no edit button', () => {
        expect(() => {
            getFaButton('menu--editor--actions--edit', 'fa-edit')
        }).toThrowError()
    })

    test('when edited - delete button displayed', () => {
        const deleteFaButton = getFaButton('menu--editor--actions--delete', 'fa-trash')
        expect(deleteFaButton).not.toBeNull()
    })

    test('when edited - close button displayed', () => {
        const closeFaButton = getFaButton('menu--editor--actions--close', 'fa-times')
        expect(closeFaButton).not.toBeNull()
    })

    test('when edited - onClick on Delete button - onDelete triggered', () => {
        const deleteFaButton = getFaButton('menu--editor--actions--delete', 'fa-trash')
        fireEvent.click(deleteFaButton)
        expect(mock_deleteBlockFn).toBeCalledTimes(1)
        expect(mock_deleteBlockFn).toBeCalledWith(testBlock)
    })

    test('when edited - onClick on Close button - onClose triggered', () => {
        const closeFaButton = getFaButton('menu--editor--actions--close', 'fa-times')
        fireEvent.click(closeFaButton)
        expect(mock_closeEditorFn).toBeCalledTimes(1)
    })
})