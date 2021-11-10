import React from "react";
import {getBlock} from "../../../../../Components/Blocks/block";
import {render} from "@testing-library/react";
import {TextEditor} from "../../../../../Components/Editor/Editors/TextEditor";

const mock_InputFieldFn = jest.fn()
jest.mock("../../../../../Components/Editor/Fields/InputField", () => (props: any) => {
    mock_InputFieldFn(props)

    return <div className="mocked_component">Mocked Component</div>
})

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

describe('Text Editor with InputField Mocked', () => {
    test("input field not called if section content not opened", () => {
        render(<TextEditor block={testBlock} onChange={() => null} onOpenSection={() => null} sections={{}} />)

        expect(mock_InputFieldFn).not.toBeCalled()
    })

    test("input field called once if section content opened", () => {
        render(<TextEditor block={testBlock} onChange={() => null} onOpenSection={() => null} sections={{content: true}} />)

        expect(mock_InputFieldFn).toBeCalledTimes(1)
        expect(mock_InputFieldFn).toBeCalledWith(
            expect.objectContaining({
                value: testBlock.content,
                inputName: 'content'
            })
        )
    })
})