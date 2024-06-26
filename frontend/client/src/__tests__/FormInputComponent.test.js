import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { useState } from 'react';
// Importing the jest testing library
import '@testing-library/jest-dom'
import FormInput from '../components/common/formInput';

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe('FormInput', () => {
    test('Form Input', () => {
        render(<FormInput label={'Name'} />);
        const label = screen.getByText('Name');
        expect(label).toBeInTheDocument();
    });

    test('Form Input with type text', () => {
        let value = "John"
        render(<FormInput label={'Name'} type="text" name="Name" value={value} />);
        const input = screen.getByDisplayValue(value)
        expect(input).toBeInTheDocument();
    })

    test('Form Input with select type', () => {
        const options = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ];
        const mockFunction = jest.fn();
        render(
            <FormInput
                label={'Select Option'}
                type="select"
                options={options}
                onChange={mockFunction}
                name="selectOption"
            />
        );
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        // fireEvent.change(select, { target: { value: 'option2' } });
        // expect(mockFunction).toHaveBeenCalled();
    });

    

})