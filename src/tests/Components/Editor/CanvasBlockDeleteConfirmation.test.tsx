import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {CanvasBlockDeleteConfirmation} from "../../../Components/Editor/CanvasBlockDeleteConfirmation";
import {getBlock} from "../../../Components/Blocks/block";

const testBlock = getBlock({
    id: '',
    type: 'text',
    _content: "A text",
    displayName: 'Text Block',
    size: {width: 10, height: 50},
    sizeUnit: "px",
    position: {x: 15, y:15},
    positionUnit: "mm"
})

const mock_onConfirmFn = jest.fn()
const mock_onCloseFn = jest.fn()

describe('CanvasBlockDeleteConfirmation', () => {
    beforeEach(() => {
        render(<CanvasBlockDeleteConfirmation block={testBlock} onConfirm={mock_onConfirmFn} onClose={mock_onCloseFn} />)
    })

    test('renders correctly the block id and block displayname', () => {
        expect(screen.getByText(/do you confirm the deletion of the block :/i, {exact: false})).not.toBeNull()
        expect(screen.getByText(`${testBlock.id} | ${testBlock.displayName}`, {exact: false})).not.toBeNull()
    })

    test('onConfirm correctly triggered', () => {
        const confirmButton = screen.getByRole('button', {name: 'Confirm Deletion'})

        fireEvent.click(confirmButton)
        expect(mock_onConfirmFn).toBeCalledTimes(1)
    })

    test('onClose correctly triggered', () => {
        const closeButton = screen.getByRole('button', {name: /cancel/i})

        fireEvent.click(closeButton)
        expect(mock_onCloseFn).toBeCalledTimes(1)
    })
})