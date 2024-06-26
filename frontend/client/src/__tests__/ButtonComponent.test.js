import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

// Importing the jest testing library
import '@testing-library/jest-dom'
import Button, {OptionButton} from '../components/common/button/index.jsx';


// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

describe('Button', () => {
    test('Primary Button', () => {
        render(<Button text={'Process'} />);
        const text = screen.getByText('Process');
        expect(text).toBeInTheDocument();
    });

    test('Primary button function', () =>{
        const mockFunction = jest.fn();
        render(<Button text={'Process'} onClick={mockFunction} />);
        const button = screen.getByText('Process');
        button.click();
        expect(mockFunction).toHaveBeenCalled();
    })

    test('Option Button', () => {
        render(<OptionButton text={'Process'} />);
        const text = screen.getByText('Process');
        expect(text).toBeInTheDocument();
    });

    test('Option button function', () =>{
        const mockFunction = jest.fn();
        render(<OptionButton text={'Process'} onClick={mockFunction} />);
        const button = screen.getByText('Process');
        button.click();
        expect(mockFunction).toHaveBeenCalled();
    })

});