import React from "react";
import {getBlock} from "../../../../../Components/Blocks/block";
import {render} from "@testing-library/react";
import TextEditor from "../../../../../Components/Editor/Editors/TextEditor";


const mock_CommonEditorFieldFn = jest.fn()
jest.mock("../../../../../Components/Editor/Editors/CommonEditorFields", () => (props: any) => {
    mock_CommonEditorFieldFn(props)
    return <div className="mocked-component">Mocked Component</div>
})

//Mock Slide Menu Item
const mock_FnSlideMenuItem = jest.fn();
jest.mock('../../../../../Components/Slide/Menu/SlideMenuItem', () => (props: any) => {
    mock_FnSlideMenuItem(props)

    return <div className="mocked-slide-menu-item">Mocked</div>
})

const mock_onOpenSection = jest.fn()

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

describe('Editor Text with Mocked Slide Menu Item', () => {
    test('Slide Menu Item called once', () => {
        render(<TextEditor block={testBlock} onChange={() => null} onOpenSection={mock_onOpenSection} sections={{}} />)

        expect(mock_FnSlideMenuItem).toBeCalledTimes(1)
        expect(mock_FnSlideMenuItem).toBeCalledWith(
            expect.objectContaining({
                title: 'Content',
                name: 'content',
                open: undefined,
                className: 'menu--item--editor--content',
                onOpen: mock_onOpenSection
            })
        )
    })
})