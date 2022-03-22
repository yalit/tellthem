import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import InputField from "../../../../../../Components/Slide/Menu/Editor/Fields/InputField";

const mock_onChangeFn = jest.fn()
const testValue = "test"
const testInputName = "test_inputName"

describe('Input Field', () => {
    test('Input Field renders correctly a value in an input field with the correct inputName', () => {
        render(<InputField value={testValue} inputName={testInputName} onChange={mock_onChangeFn} />)

        const inputField = screen.getByRole('textbox', {name: testInputName})

        expect(inputField).not.toBeNull()
        expect(inputField.getAttribute('value')).toBe(testValue)
    })

    test('onChange correctly triggers when input changed', () => {
        render(<InputField value={testValue} inputName={testInputName} onChange={mock_onChangeFn} />)

        const inputField = screen.getByRole('textbox', {name: testInputName})
        const changedValue = "New value for input"

        fireEvent.change(inputField, {target: {value: changedValue}})
        expect(mock_onChangeFn).toBeCalledTimes(1)
        expect(mock_onChangeFn).toBeCalledWith(changedValue)
    })
})