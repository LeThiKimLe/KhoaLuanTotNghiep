import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomButton from 'src/views/customButton/CustomButton'
import '@testing-library/jest-dom'

describe('CustomButton', () => {
    test('renders button with text when loading is false', () => {
        render(<CustomButton loading={false} text="Click me" />)
        const buttonElement = screen.getByText(/Click me/i)
        expect(buttonElement).toBeInTheDocument()
    })

    test('renders button with spinner when loading is true', () => {
        render(<CustomButton loading={true} text="Loading" />)
        const spinnerElement = screen.getByTestId('spinner')
        expect(spinnerElement).toBeInTheDocument()
    })

    test('renders button with children', () => {
        render(
            <CustomButton loading={false} text="Click me">
                <span>Child element</span>
            </CustomButton>,
        )
        const childElement = screen.getByText(/Child element/i)
        expect(childElement).toBeInTheDocument()
    })
})
