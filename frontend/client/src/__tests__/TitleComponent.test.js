import React from 'react';
import { render } from '@testing-library/react';
import SectionTitle from '../components/common/sectionTitle';
import '@testing-library/jest-dom'

describe('SectionTitle', () => {
    it('renders the title and subtitle correctly', () => {
        const title = 'Hello';
        const subtitle = 'World';
        const { getByText } = render(<SectionTitle title={title} subtitle={subtitle} />);
        
        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(subtitle)).toBeInTheDocument();
    });

    it('applies the custom className correctly', () => {
        const title = 'Hello';
        const subtitle = 'World';
        const className = 'custom-class';
        const { container } = render(<SectionTitle title={title} subtitle={subtitle} className={className} />);
        
        expect(container.firstChild).toHaveClass(className);
    });

    it('passes extra props correctly', () => {
        const title = 'Hello';
        const subtitle = 'World';
        const dataTestId = 'section-title';
        const { getByTestId } = render(<SectionTitle title={title} subtitle={subtitle} data-testid={dataTestId} />);
        
        expect(getByTestId(dataTestId)).toBeInTheDocument();
    });
});