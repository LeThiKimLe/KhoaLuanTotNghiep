import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'

// Importing the jest testing library
import '@testing-library/jest-dom'
import Dashboard from 'src/views/dashboard/Dashboard'

afterEach(() => {
    cleanup() // Resets the DOM after each test suite
})

describe('HomePage', () => {
    // test('renders list navigation', () => {
    //     render(<Button text="Click here"/>);
    //     const listNavigation = screen.getByText("Click here")
    //     expect(listNavigation).toBeInTheDocument();
    // });

    test('renders "Tuyến đường phổ biến" section', () => {
        render(<Dashboard />)
        const popularRoutesSection = screen.getByText('Tuyến đường phổ biến')
        expect(popularRoutesSection).toBeInTheDocument()
    })

    // test('renders "Cảm nhận của khách hàng" section', () => {
    //     render(<Home />);
    //     const customerReviewsSection = screen.getByText('Cảm nhận của khách hàng');
    //     expect(customerReviewsSection).toBeInTheDocument();
    // });
})
