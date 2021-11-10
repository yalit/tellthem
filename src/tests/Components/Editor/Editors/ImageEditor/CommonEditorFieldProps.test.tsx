import React from "react";
import {getBlock} from "../../../../../Components/Blocks/block";
import {render} from "@testing-library/react";
import ImageEditor from "../../../../../Components/Editor/Editors/ImageEditor";

const mock_CommonEditorFieldFn = jest.fn()
jest.mock("../../../../../Components/Editor/Editors/CommonEditorFields", () => (props: any) => {
    mock_CommonEditorFieldFn(props)
    return <div className="mocked-component">Mocked Component</div>
})

const mock_onChangeFn = jest.fn()
const mock_onOpenSection = jest.fn()
const test_sections = {test: true}

describe('Image Editor with CommonEditorProps mocked', () => {
    test('Common Editor Field called only once with the same props as Text Editor', () => {
        const testBlock = getBlock({
            id: "",
            type: 'img',
            _content: "",
            displayName: 'Image Block',
            size: {width: 10, height: 50},
            sizeUnit: "px",
            position: {x: 15, y:15},
            positionUnit: "mm"
        })
        render(<ImageEditor block={testBlock} onChange={mock_onChangeFn} onOpenSection={mock_onOpenSection} sections={test_sections} />)

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
