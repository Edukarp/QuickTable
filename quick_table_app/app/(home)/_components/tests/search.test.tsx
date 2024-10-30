import { render, screen, fireEvent, act } from '@testing-library/react';
import Search from '../search';
import { useRouter } from 'next/navigation';
import "@testing-library/jest-dom";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Test Search Component', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const defaultValues = { search: '' };

    beforeEach(() => {
        render(<Search defaultValues={defaultValues} />);
    });

    it('renders input and button', () => {
        const input = screen.getByPlaceholderText('Busque por um restaurante');
        const button = screen.getByRole('button');

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('validates empty input', async () => {
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const errorMessage = await screen.findByText('Campo Obrigatório');
        expect(errorMessage).toBeInTheDocument();
    });

    it('submits form with valid input', async () => {
        const input = screen.getByPlaceholderText('Busque por um restaurante');
        const button = screen.getByRole('button');
        
        await act(async () => {
            fireEvent.change(input, { target: { value: 'Restaurante do' } });
            fireEvent.click(button);
        });

        expect(mockPush).toHaveBeenCalledWith('/restaurants?search=Restaurante do');
    });
});