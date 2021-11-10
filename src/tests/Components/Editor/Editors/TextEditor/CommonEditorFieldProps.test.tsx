import React from "react";
import TextEditor from "../../../../../Components/Editor/Editors/TextEditor";
import {getBlock} from "../../../../../Components/Blocks/block";
import {render} from "@testing-library/react";

const mock_CommonEditorFieldFn = jest.fn()
jest.mock("../../../../../Components/Editor/Editors/CommonEditorFields", () => (props: any) => {
    mock_CommonEditorFieldFn(props)
    return <div className="mocked-component">Mocked Component</div>
})

const mock_onChangeFn = jest.fn()
const mock_onOpenSection = jest.fn()
const test_sections = {test: true}

describe('Text Editor with CommonEditorProps mocked', () => {
    test('Common Editor Field called only once with the same props as Text Editor', () => {
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
        render(<TextEditor block={testBlock} onChange={mock_onChangeFn} onOpenSection={mock_onOpenSection} sections={test_sections} />)

        expect(mock_CommonEditorFieldFn).toBeCalledTimes(1)
        expect(mock_CommonEditorFieldFn).toBeCalledWith(
            expect.objectContaining({
                block: testBlock,
                onChange: mock_onChangeFn,
                onOpenSection: mock_onOpenSection,
                sections: test_sections
            })
        )
    })
})
