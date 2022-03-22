import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import SlideCover from "../../../Components/Slide/SlideCover";
import {createSlide, SlideData} from "../../../Components/Slide/SlideData";

const mock_onAdd = jest.fn()
const mock_onShow = jest.fn();
const mock_onDelete = jest.fn();

describe('Slide Cover testing with no slide',() => {
    beforeEach(() => {
        render(<SlideCover slide={null} onAdd={mock_onAdd } onDelete={() => {}} onShow={() => {} }/>)
    })

    test('cover displays 1 add button', async () => {
        const addButton = document.getElementsByClassName('slide-cover--add--button');
        expect(addButton).toHaveLength(1)
    });

    test('on click on "Add Button", onAdd called', () => {
        const addButton = document.getElementsByClassName('slide-cover--add--button')[0];
        fireEvent.click(addButton)

        expect(mock_onAdd).toBeCalledTimes(1)
    })
})

describe('Slide Cover testing with one slide',() => {
    const slideTitle = "Un slide de test";
    const slideData: SlideData = createSlide({
        title: slideTitle,
        description: "Description"
    })

    beforeEach(() => {
        render(<SlideCover slide={slideData} onAdd={() => {}} onDelete={mock_onDelete} onShow={mock_onShow}/>)
    })

    test('cover displays no add button', async () => {
        const addButton = document.getElementsByClassName('slide-cover--add--button');
        expect(addButton).toHaveLength(0)
    });

    test('cover displays title of the slide', () => {
        expect(screen.getByText(slideTitle)).not.toBeNull()
    })

    test('on click on "Delete Button", onDelete called', () => {
        const deleteButton = document.getElementsByClassName('slide-cover--delete--button')[0];
        fireEvent.click(deleteButton)

        expect(mock_onDelete).toBeCalledTimes(1)
    })

    test('on click on title, onShow called', () => {
        const slideCoverTitle = document.getElementsByClassName('slide-cover--title')[0];
        fireEvent.click(slideCoverTitle)

        expect(mock_onShow).toBeCalledTimes(1)
    })
})