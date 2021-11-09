import {render} from "@testing-library/react";
import {CommonEditorFields} from "../../../../../Components/Editor/Editors/CommonEditorFields";
import {getBlock} from "../../../../../Components/Blocks/block";

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

describe('Common Editor Fields basic functionalities', () => {
    test('Correct number of menu items', () => {
        render(<CommonEditorFields block={testBlock} onChange={() => null} onOpenSection={mock_onOpenSection}
                                   sections={{}} />)
        expect(mock_FnSlideMenuItem).toBeCalledTimes(2)
        expect(mock_FnSlideMenuItem).toHaveBeenNthCalledWith(1,
            expect.objectContaining({
                title: "Name",
                name: "name",
                className: "menu--item--editor--name",
                onOpen: mock_onOpenSection,
                open: undefined
            }))
        expect(mock_FnSlideMenuItem).toHaveBeenNthCalledWith(2,
            expect.objectContaining({
                title: "Size",
                name: "size",
                className: "menu--item--editor--sizes",
                onOpen: mock_onOpenSection,
                open: undefined
            })
        )
    })

    test('Name menu called with correct open status', () => {
        render(<CommonEditorFields block={testBlock} onChange={() => null} onOpenSection={mock_onOpenSection}
                                   sections={{name: true}} />)
        expect(mock_FnSlideMenuItem).toBeCalledTimes(2)
        expect(mock_FnSlideMenuItem).toHaveBeenNthCalledWith(1,
            expect.objectContaining({
                open: true
            }))
        expect(mock_FnSlideMenuItem).toHaveBeenNthCalledWith(2,
            expect.objectContaining({
                open: undefined
            })
        )
    })

    test('Size menu called with correct open status', () => {
        render(<CommonEditorFields block={testBlock} onChange={() => null} onOpenSection={mock_onOpenSection}
                                   sections={{size: true}}/>)

        expect(mock_FnSlideMenuItem).toHaveBeenNthCalledWith(1,
            expect.objectContaining({
                open: undefined
            }))
        expect(mock_FnSlideMenuItem).toHaveBeenNthCalledWith(2,
            expect.objectContaining({
                open: true
            })
        )
    })
})
