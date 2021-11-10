import {render} from "@testing-library/react";
import CommonEditorFields from "../../../../../../../Components/Slide/Menu/Editor/Editors/CommonEditorFields";
import {getBlock} from "../../../../../../../Components/Blocks/block";
//Mock Slide Menu Item
const mock_FnSlideInputField = jest.fn()
jest.mock('../../../../../../../Components/Slide/Menu/Editor/Fields/SliderInput', () => (props: any) => {
    mock_FnSlideInputField(props)

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

describe('Common Editor Name Slider Inputs Field', () => {
    test('Correct number of times present', () => {
        render(<CommonEditorFields block={testBlock} onChange={() => null} onOpenSection={() => null}
                                   sections={{size: true}} />)

        expect(mock_FnSlideInputField).toBeCalledTimes(2)
        expect(mock_FnSlideInputField).toHaveBeenNthCalledWith(1,
            expect.objectContaining({
                value: testBlock.size.width,
                name: "width",
                min: 10,
                max: 100 - testBlock.position.x
            })
        )

        expect(mock_FnSlideInputField).toHaveBeenNthCalledWith(2,
            expect.objectContaining({
                value: testBlock.size.height,
                name: "height",
                min: 10,
                max: 100 - testBlock.position.y
            })
        )
    })
})
