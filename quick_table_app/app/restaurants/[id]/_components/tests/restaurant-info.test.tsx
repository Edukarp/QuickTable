import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RestaurantInfo from '../restaurant-info';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { getDayBookings } from '../../_actions/get-day-bookings';
import { saveBooking } from '../../_actions/saveBooking';
import { toast } from 'sonner';
import "@testing-library/jest-dom";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
    useSession: jest.fn(),
}));

jest.mock('../../_actions/get-day-bookings', () => ({
    getDayBookings: jest.fn(),
}));

jest.mock('../../_actions/saveBooking', () => ({
    saveBooking: jest.fn(),
}));

jest.mock('sonner', () => ({
    toast: jest.fn(),
}));

const mockRestaurant = {
    id: "26",
    name: "Restaurante do Zé",
    imageUrl: "https://cdn.pixabay.com/photo/2017/04/09/12/49/chicken-breast-filet-2215709_1280.jpg",
    address: "Rua do Zé, 123",
    plates: [],
    bookings: [],
  }

const mockSession = {
    data: {
        user: {
            id: 'user1',
        },
    },
};

describe('RestaurantInfo', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            replace: jest.fn(),
            push: jest.fn(),
        });
        (useSession as jest.Mock).mockReturnValue(mockSession);
    });

    it('renders restaurant information', () => {
        render(<RestaurantInfo restaurant={mockRestaurant} isAuthenticated={true} />);

        expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
        expect(screen.getByText(mockRestaurant.address)).toBeInTheDocument();
    });

    it('calls signIn when booking button is clicked and user is not authenticated', () => {
        render(<RestaurantInfo restaurant={mockRestaurant} isAuthenticated={false} />);

        fireEvent.click(screen.getByText('Reservar'));

        expect(signIn).toHaveBeenCalledWith('google');
    });

    it('opens booking sheet when booking button is clicked and user is authenticated', () => {
        render(<RestaurantInfo restaurant={mockRestaurant} isAuthenticated={true} />);

        fireEvent.click(screen.getByText('Reservar'));

        expect(screen.getByText('Fazer Reserva')).toBeInTheDocument();
    });

    it('fetches day bookings when a date is selected', async () => {
        (getDayBookings as jest.Mock).mockResolvedValue([]);

        render(<RestaurantInfo restaurant={mockRestaurant} isAuthenticated={true} />);

        fireEvent.click(screen.getByText('Reservar'));

        const dateButton = screen.getByText('31');

        fireEvent.click(dateButton);
        //console.log(dateButton);

        await waitFor(() => {
            expect(getDayBookings).toHaveBeenCalledWith(mockRestaurant.id, expect.any(Date));
        });
    });

    it('submits a booking successfully', async () => {
        (saveBooking as jest.Mock).mockResolvedValue({});
        render(<RestaurantInfo restaurant={mockRestaurant} isAuthenticated={true} />);

        fireEvent.click(screen.getByText('Reservar'));

        const dateButton = screen.getByText('31');
        fireEvent.click(dateButton);

        const timeButton = screen.getByText('18:00');
        fireEvent.click(timeButton);

        const confirmButton = screen.getByText('Confirmar Reserva');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(saveBooking).toHaveBeenCalledWith({
                restaurantId: mockRestaurant.id,
                date: expect.any(Date),
                userId: mockSession.data.user.id,
            });
            expect(toast).toHaveBeenCalledWith('Reserva efetuada com sucesso!', expect.any(Object));
        });
    });
});