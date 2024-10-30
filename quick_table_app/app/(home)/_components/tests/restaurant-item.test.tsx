import { render, screen, fireEvent } from '@testing-library/react';
import RestaurantItem from '../restaurant-item';
import { useRouter } from 'next/navigation';
import "@testing-library/jest-dom";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const mockRouter = {
    push: jest.fn(),
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

const mockRestaurant = {
    id: "26",
    name: "Restaurante do Zé",
    imageUrl: "https://cdn.pixabay.com/photo/2017/04/09/12/49/chicken-breast-filet-2215709_1280.jpg",
    address: "Rua do Zé, 123",
    plates: [],
    bookings: [],
  }

describe('Test RestaurantItem', () => {
    it('renders restaurant details correctly', () => {
        render(<RestaurantItem restaurant={mockRestaurant} />);

        expect(screen.getByText('Restaurante do Zé')).toBeInTheDocument();
        expect(screen.getByText('Rua do Zé, 123')).toBeInTheDocument();
        expect(screen.getByText('Reservar')).toBeInTheDocument();
    });

    it('navigates to restaurant page on button click', () => {
        render(<RestaurantItem restaurant={mockRestaurant} />);

        const button = screen.getByText('Reservar');
        fireEvent.click(button);

        expect(mockRouter.push).toHaveBeenCalledWith('/restaurants/26');
    });
});