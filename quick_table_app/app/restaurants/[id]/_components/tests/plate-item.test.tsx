import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlateItem from "../plate-item";
import { Decimal } from "@prisma/client/runtime/library";


const mockPlateItem1 = {
    id: "1",
    name: "Filé de Frango",
    description: "Um delicioso Filé de Frango com molho da casa.",
    price: new Decimal("40.0"),
    imageUrl: "https://cdn.pixabay.com/photo/2017/04/09/12/49/chicken-breast-filet-2215709_1280.jpg",
    restaurantId: "26",
  }

const mockPlateItem2 = {
    id: "2",
    name: "Bife",
    description: "Suculento e macio, grelhado à perfeição.",
    price: new Decimal("39.0"),
    imageUrl: "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_1280.jpg",
    restaurantId: "26",
}

const mockRestaurant = {
    id: "26",
    name: "Restaurante do Zé",
    imageUrl: "https://cdn.pixabay.com/photo/2017/04/09/12/49/chicken-breast-filet-2215709_1280.jpg",
    address: "Rua do Zé, 123",
    plates: [mockPlateItem1, mockPlateItem2],
    bookings: [],
  }

describe('Test PlateItem', () => {
    it('should get the item by name successfully', () => {
        render(<PlateItem plate={mockPlateItem1} />);
        expect(screen.getByText('Filé de Frango')).toBeInTheDocument();
    
    });

    it('should get the item by id successfully', () => {
        render(<PlateItem plate={mockPlateItem1} />);
        expect(mockPlateItem1.id).toBe("1");
        
    });

    it('should get the item by restaurantId successfully', () => {
        render(<PlateItem plate={mockPlateItem1} />);
        expect(mockPlateItem1.restaurantId).toBe("26");
        
    });

    it('should get the item by price successfully formated', () => {
        render(<PlateItem plate={mockPlateItem1} />);
        expect(screen.getByText('R$ 40,00')).toBeInTheDocument();
        
    });
})

describe('Test PlateItem with Restaurant', () => {
    it('should get the Plate-item by name successfully', () => {
        expect(mockRestaurant.plates[0].name).toBe("Filé de Frango");
        expect(mockRestaurant.plates[1].name).toBe("Bife");
    });

    it('should get the Plate-item by id successfully', () => {
        expect(mockRestaurant.plates[0].id).toBe("1");
        expect(mockRestaurant.plates[1].id).toBe("2");
    });

    it('should get the Plate-item by restaurantId successfully', () => {
        expect(mockRestaurant.plates[0].restaurantId).toBe("26");
        expect(mockRestaurant.plates[1].restaurantId).toBe("26");
    });
})