import {render} from "@testing-library/react";
import {CommonEditorFields} from "../../../../../Components/Editor/Editors/CommonEditorFields";
import {getBlock} from "../../../../../Components/Blocks/block";

//Mock Slide Menu Item
const mock_FnInputfield = jest.fn()
jest.mock('../../../../../Components/Editor/Fields/InputField', () => (props: any) => {
    mock_FnInputfield(props)

    return <div className="mocked-slide-menu-item">Mocked</div>
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

describe('Common Editor Name Input Field', () => {
    test('Correct number of times present', () => {
        render(<CommonEditorFields block={testBlock} onChange={() => null} onOpenSection={() => null}
                                   sections={{name: true}} />)

        expect(mock_FnInputfield).toBeCalledTimes(1)
        expect(mock_FnInputfield).toBeCalledWith(
            expect.objectContaining({
                value: testBlock.displayName,
                inputName: "name",
            })
        )
    })
})
