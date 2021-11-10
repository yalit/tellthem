import React from "react";
import {getBlock} from "../../../../Components/Blocks/block";
import {render} from "@testing-library/react";
import CanvasBlockEditor from "../../../../Components/Editor/CanvasBlockEditor";

const mock_updateBlockFn = jest.fn()

// mock Text Editor
const mock_textEditorPropsFn = jest.fn()
jest.mock("../../../../Components/Editor/Editors/TextEditor", () => (props: any) => {
    mock_textEditorPropsFn(props)

    return <div className="mocked_component">Text Editor mocked component</div>
})

// mock Image Editor
const mock_imgEditorPropsFn = jest.fn()
jest.mock("../../../../Components/Editor/Editors/ImageEditor", () => (props: any) => {
    mock_imgEditorPropsFn(props)

    return <div className="mocked_component">Text Editor mocked component</div>
})

const textBlock = getBlock({
    id: '',
    type: 'text',
    _content: "A text",
    displayName: 'Text Block',
    size: {width: 10, height: 50},
    sizeUnit: "px",
    position: {x: 15, y:15},
    positionUnit: "mm"
})

const imageBlock = getBlock({
    id: '',
    type: 'img',
    _content: "",
    displayName: 'Image Block',
    size: {width: 10, height: 50},
    sizeUnit: "px",
    position: {x: 15, y:15},
    positionUnit: "mm"
})

describe('Canvas Block Editor - Text Editor not edited', () => {
    beforeEach(() => {
        render(<CanvasBlockEditor block={textBlock} edited={false} editBlock={() => null} updateBlock={() => null} deleteBlock={() => null} closeEditor={() => null} />)
    })

    test('not edited block - not showing text Editor', () => {
        expect(mock_textEditorPropsFn).not.toBeCalled()
    })

    test('not edited block - not showing Image Editor', () => {
        expect(mock_imgEditorPropsFn).not.toBeCalled()
    })
})

describe('Canvas Block Editor - Text Editor edited', () => {
    beforeEach(() => {
        render(<CanvasBlockEditor block={textBlock} edited={true} editBlock={() => null} updateBlock={mock_updateBlockFn} deleteBlock={() => null} closeEditor={() => null} />)
    })

    test('text edited block - showing text Editor', () => {
        expect(mock_textEditorPropsFn).toBeCalledTimes(1)
        expect(mock_textEditorPropsFn).toBeCalledWith(
            expect.objectContaining({
                block: textBlock,
                onChange: mock_updateBlockFn,
                sections: {}
            })
        )
    })

    test('text edited block - not showing Image Editor', () => {
        expect(mock_imgEditorPropsFn).not.toBeCalled()
    })
})

describe('Canvas Block Editor - Image Editor edited', () => {
    beforeEach(() => {
        render(<CanvasBlockEditor block={imageBlock} edited={true} editBlock={() => null} updateBlock={mock_updateBlockFn} deleteBlock={() => null} closeEditor={() => null} />)
    })

    test('image edited block - showing image Editor', () => {
        expect(mock_imgEditorPropsFn).toBeCalledTimes(1)
        expect(mock_imgEditorPropsFn).toBeCalledWith(
            expect.objectContaining({
                block: imageBlock,
                onChange: mock_updateBlockFn,
                sections: {}
            })
        )
    })

    test('image edited block - not showing Text Editor', () => {
        expect(mock_textEditorPropsFn).not.toBeCalled()
    })
})