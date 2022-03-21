import React from 'react';
import {createSlide, SlideData} from "../../../Components/Slide/SlideData";
import {BlockData} from "../../../Components/Blocks/block";

describe('Slide data creation testing',() => {
    const slideTitle : string = "Slide Title";
    const slideDescription: string = "Slide Description";

    test('Slide data create only with title', async () => {
        const slide: SlideData = createSlide({title: slideTitle})
        expect(slide.title).toBe(slideTitle)
        expect(slide.description).toBeUndefined();
        expect(slide.id).not.toBeNull()
        expect(slide.blocks).toEqual([]);
    });

    test('Slide data create only with no blocks', async () => {
        const slide: SlideData = createSlide({title: slideTitle, description: slideDescription})
        expect(slide.title).toBe(slideTitle)
        expect(slide.description).toBe(slideDescription);
        expect(slide.id).not.toBeNull()
        expect(slide.blocks).toEqual([]);
    });

    test('Slide data create only with blocks', async () => {
        const blockData: BlockData = {
            type: 'text',
            displayName: "Text Block",
            positionUnit: "px",
            position: {x: 0, y: 0},
            sizeUnit: "px",
            size: {width: 100, height: 100},
            _content: "Some content"
        }
        const slide: SlideData = createSlide({title: slideTitle, description: slideDescription, blocks: [blockData]})
        expect(slide.title).toBe(slideTitle)
        expect(slide.description).toBe(slideDescription);
        expect(slide.id).not.toBeNull()
        expect(slide.blocks.length).toBe(1);
    });
})
