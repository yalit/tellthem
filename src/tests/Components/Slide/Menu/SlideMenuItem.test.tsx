import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import SlideMenuItem from "../../../../Components/Slide/Menu/SlideMenuItem";

const testTitle = "Slide Title - Test"
const testName = "testMenu"
const testClassName = "testClassName"
const testedChildrenId = "tested-children"
const parentButtonClass = 'slide-display--menu--item--caret'
const mock_onOpen = jest.fn()

const isOpeningButton = (elem: Element) => {
    return elem.tagName === "svg" && elem.classList.contains('fa-caret-right')
}

const isClosingButton = (elem: Element) => {
    return elem.tagName === "svg" && elem.classList.contains('fa-caret-down')
}

describe('Generic SlideMenuItem - no children', () => {
    beforeEach(() => {
        render(<SlideMenuItem title={testTitle} name={testName} className={testClassName}/>)
    })

    test('title is displayed', () => {
        expect(screen.getByText(testTitle)).not.toBeNull()
    })

    test('className is applied to slide menu item', () => {
        const mainMenuItem = document.getElementsByClassName('slide-display--menu--item')
        expect(mainMenuItem).toHaveLength(1)
        expect(mainMenuItem[0].classList.contains(testClassName)).toBeTruthy()
    })

    test('is closed by default', () => {
        expect(document.getElementsByClassName('slide-display--menu--item--data')).toHaveLength(0)

        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        expect(openButtonParent).toHaveLength(1)

        const openButtonList = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))
        expect(openButtonList).toHaveLength(1)
    })
})

describe('Generic Slide Menu Item - open', () => {
    test('without children - close button is seeable', () => {
        render(<SlideMenuItem title={testTitle} name={testName} open={true} /> )
        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        const closeButton = Array.from(openButtonParent[0].children).filter(child => isClosingButton(child))[0]

        expect(closeButton).not.toBeUndefined()
    })

    test('with Children - children is seeable', () => {
        render(<SlideMenuItem title={testTitle} name={testName} open={true}><div id={testedChildrenId}>Tested Children</div></SlideMenuItem>)
        const children = document.getElementById(testedChildrenId)
        expect(children).not.toBeNull()
    })
})

describe('Generic SlideMenuItem - with children', () => {
    test('children is not displayed by default', () => {
        render(<SlideMenuItem title={testTitle} name={testName} className={testClassName}><div id={testedChildrenId}>Tested Children</div></SlideMenuItem>)
        expect(document.getElementById(testedChildrenId)).toBeNull()
    })

    test('children is displayed when open', () => {
        render(<SlideMenuItem title={testTitle} name={testName} className={testClassName} open={true}><div id={testedChildrenId}>Tested Children</div></SlideMenuItem>)
        expect(document.getElementById(testedChildrenId)).not.toBeNull()
    })
})

describe('Generic slide Menu Item - opening the item', () => {
    beforeEach(() => {
        render(<SlideMenuItem title={testTitle} name={testName} className={testClassName}><div id={testedChildrenId}>Tested Children</div></SlideMenuItem>)
    })

    test('onClick on button - children is seeable', () => {
        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        const openButton = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))[0]
        fireEvent.click(openButton)

        const children = document.getElementById(testedChildrenId)
        expect(children).not.toBeNull()
        expect(children).toContainHTML("Tested Children")
    })

    test('onClick on button - closing button is seeable', () => {
        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        const openButton = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))[0]
        fireEvent.click(openButton)

        const closeButtonList = Array.from(openButtonParent[0].children).filter(child => isClosingButton(child))
        expect(closeButtonList).toHaveLength(1)

        const noOpenButton = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))[0]
        expect(noOpenButton).toBeUndefined()

    })

    test('onClick on button twice - children is not seeable anymore', () => {
        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        const openButton = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))[0]
        fireEvent.click(openButton)

        const closeButton = Array.from(openButtonParent[0].children).filter(child => isClosingButton(child))[0]
        fireEvent.click(closeButton)

        const noChildren = document.getElementById(testedChildrenId)
        expect(noChildren).toBeNull()
    })

    test('onClick on button twice - opening button is seeable', () => {
        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        const openButton = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))[0]
        fireEvent.click(openButton)

        const closeButton = Array.from(openButtonParent[0].children).filter(child => isClosingButton(child))[0]
        fireEvent.click(closeButton)

        const reOpenButton = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))[0]
        expect(reOpenButton).not.toBeUndefined()

        const noCloseButton = Array.from(openButtonParent[0].children).filter(child => isClosingButton(child))[0]
        expect(noCloseButton).toBeUndefined()
    })
})


describe('Generic Slide Menu Item - use onOpen function', () => {
    test('onclick on open button - onOpen is triggered', () => {
        render(<SlideMenuItem title={testTitle} name={testName} onOpen={mock_onOpen} />)

        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        const openButton = Array.from(openButtonParent[0].children).filter(child => isOpeningButton(child))[0]
        fireEvent.click(openButton)

        expect(mock_onOpen).toBeCalledTimes(1)
        
        let testDataOnOpen: {[key: string]: boolean} = {}
        testDataOnOpen[testName] = true
        expect(mock_onOpen).toBeCalledWith(testDataOnOpen)
    })

    test('onclick on close button - onOpen is triggered', () => {
        render(<SlideMenuItem title={testTitle} name={testName} open={true} onOpen={mock_onOpen} />)

        const openButtonParent = document.getElementsByClassName(parentButtonClass)
        const closeButton = Array.from(openButtonParent[0].children).filter(child => isClosingButton(child))[0]
        fireEvent.click(closeButton)

        expect(mock_onOpen).toBeCalledTimes(1)

        let testDataOnOpen: {[key: string]: boolean} = {}
        testDataOnOpen[testName] = false
        expect(mock_onOpen).toBeCalledWith(testDataOnOpen)
    })
})
