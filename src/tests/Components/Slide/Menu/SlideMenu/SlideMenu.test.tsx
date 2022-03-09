import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {SlideMenu, SlideMenuProps} from "../../../../../Components/Slide/Menu/SlideMenu";
import {SlideData} from "../../../../../Components/Slide/SlideData";
import {Block, getBlock} from "../../../../../Components/Blocks/block";

const testSlideTitle = 'test-title';
const testSlideDescription = 'test-description';
const mock_onClose = jest.fn()

let slideMenuProps: SlideMenuProps = {
    currentSlide: new SlideData({
        title: testSlideTitle,
        description: testSlideDescription,
        blocks: []
    }),
    updateSlide: (slideData: Partial<SlideData>) => console.log("UpdateSlide :", slideData),
    closeSlide: mock_onClose,
    closeEditor: () => console.log("Close Editor"),
    editedBlock: undefined,
    editBlock: () => console.log("Edit Block"),
    updateBlock: () => console.log("Update Block"),
    deleteBlock: (block: Block) => console.log("Delete Block", block),
}

describe('Generic SlideMenu - no blocks', () => {
    beforeEach(() => {
        render(<SlideMenu {...slideMenuProps}/>)
    })

    test('Slide Title menu item title is displayed', () => {
        expect(screen.getByText('Slide Title')).not.toBeNull()
    })

    test('Available Block menu item title is displayed', () => {
        expect(screen.getByText("Available Blocks")).not.toBeNull()
    })

    test('Slide Blocks menu item title is displayed', () => {
        expect(screen.getByText('Slide Blocks (0)')).not.toBeNull()
    })

    test('Close button exists', () => {
        const closeButton = document.getElementsByClassName('slide-display--menu--actions--close');
        expect(closeButton).toHaveLength(1)
    })

    test('onclick on close button - onClose is triggered', () => {
        const closeButton = document.getElementsByClassName('slide-display--menu--actions--close')[0];
        fireEvent.click(closeButton)

        expect(mock_onClose).toBeCalledTimes(1)
    })
})

describe('Slide Menu with multiple blocks', () => {
    beforeEach(() => {
        let slide = slideMenuProps.currentSlide
        slide.blocks = [
            getBlock({
                type: 'text',
                displayName: 'test Text Block',
                _content: 'Test content',
                positionUnit: "px",
                position: {x: 0, y: 0},
                sizeUnit: "px",
                size: {width: 100, height: 100}
            })
        ]
        Object.assign(slideMenuProps, {currentSlide: slide})

        render(<SlideMenu {...slideMenuProps} />)
    })

    test('One block is displayed', () => {
        expect(screen.getByText('Slide Blocks (1)')).not.toBeNull()
    })
})