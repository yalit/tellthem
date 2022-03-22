import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import SliderInput from "../../../../../../Components/Slide/Menu/Editor/Fields/SliderInput";

const mock_onChangeFn = jest.fn()
const testMin = 10
const testMax = 100
const testValue = 10
const testInputName = "test_inputName"

describe('Slider Input', () => {
    beforeEach(() => {
        render(<SliderInput value={testValue} min={testMin} max={testMax} onChange={mock_onChangeFn} name={testInputName} />)
    })

    test('renders correctly a slider with value and inputName', () => {
        const slider = screen.getByRole('slider', {name: testInputName})
        expect(slider).not.toBeNull()
        expect(slider.getAttribute('value')).toBe(`${testValue}`)
    })

    test('renders correctly and min and max are setup correctly', () => {
        const slider = screen.getByRole('slider', {name: testInputName})

        expect(slider.getAttribute('min')).toBe(`${testMin}`)
        expect(slider.getAttribute('max')).toBe(`${testMax}`)
    })

    test('onChange function triggered correctly and with the correct data', () => {
        const slider = screen.getByRole('slider', {name: testInputName})
        const changedValue = 50

        fireEvent.change(slider, {target: {value: changedValue}})
        expect(mock_onChangeFn).toBeCalledTimes(1)
        expect(mock_onChangeFn).toBeCalledWith(changedValue)
    })
})