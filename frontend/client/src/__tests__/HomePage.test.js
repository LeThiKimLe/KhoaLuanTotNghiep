import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/customer/home/index'

describe('HomePage', () => {
    test('renders list navigation', () => {
        render(<Home />);
        const listNavigation = screen.getByRole('navigation');
        expect(listNavigation).toBeInTheDocument();
    });

    test('renders "Tuyến đường phổ biến" section', () => {
        render(<Home />);
        const popularRoutesSection = screen.getByText('Tuyến đường phổ biến');
        expect(popularRoutesSection).toBeInTheDocument();
    });

    test('renders "Cảm nhận của khách hàng" section', () => {
        render(<Home />);
        const customerReviewsSection = screen.getByText('Cảm nhận của khách hàng');
        expect(customerReviewsSection).toBeInTheDocument();
    });
});