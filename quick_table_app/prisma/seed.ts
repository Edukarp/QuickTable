const { PrismaClient } = require("@prisma/client");
//import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
        "https://cdn.pixabay.com/photo/2016/03/27/21/34/restaurant-1284351_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/22/21/restaurant-1837150_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/21/16/02/outdoor-dining-1846137_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/15/53/breakfast-1835478_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/07/31/11/22/man-2557408_1280.jpg",
        "https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1280.jpg",
        "https://cdn.pixabay.com/photo/2021/09/26/13/47/table-6657853_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/09/14/11/43/restaurant-939435_1280.jpg",
        "https://cdn.pixabay.com/photo/2013/12/31/21/47/restaurant-237060_1280.jpg"
        
    ];
    // Nomes criativos para os restaurantes
    const creativeNames = [
      "Sabores do Mundo",
      "Casa das Especiarias",
      "Sabor e Arte",
      "La Mesa",
      "Tempero Urbano",
      "Jardim Gourmet",
      "Essência do Paladar",
      "Estação Sabor",
      "Sabores em Movimento",
      "Bistrô Raizes",
    ];

    // Endereços fictícios para os restaurantes
    const addresses = [
      "Rua das Flores, 123",
      "Avenida Central, 456",
      "Praça dos Sabores, 789",
      "Rua do Paladar, 101",
      "Alameda das Especiarias, 202",
      "Avenida Vista Mar, 303",
      "Avenida Elegante, 404",
      "Praça dos Sentidos, 505",
      "Rua dos Tempos, 606",
      "Avenida Clássica, 707",
    ];

    const plates = [
      {
        name: "Sushi",
        description: "Com peixes frescos e sabores irresistiveis.",
        price: 70.0,
        imageUrl: "https://cdn.pixabay.com/photo/2020/04/04/15/07/sushi-5002639_1280.jpg",
      },
      {
        name: "Filé de Frango",
        description: "Um delicioso Filé de Frango com molho da casa.",
        price: 40.0,
        imageUrl: "https://cdn.pixabay.com/photo/2017/04/09/12/49/chicken-breast-filet-2215709_1280.jpg",
      },
      {
        name: "Lasanha",
        description: "Feita com molho de tomate artesanal.",
        price: 45.0,
        imageUrl: "https://cdn.pixabay.com/photo/2021/02/06/11/51/food-5987888_960_720.jpg",
      },
      {
        name: "Bife",
        description: "Suculento e macio, grelhado à perfeição.",
        price: 39.0,
        imageUrl: "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_1280.jpg",
      },
      {
        name: "Farfalle",
        description: "Delicadamente cozido al dente e envolto em um molho cremoso.",
        price: 55.0,
        imageUrl: "https://cdn.pixabay.com/photo/2016/11/23/18/31/pasta-1854245_1280.jpg",
      },
      {
        name: "Tiramissu",
        description: "Autêntico tiramissu italiano feito com ingredientes artesanais.",
        price: 25.0,
        imageUrl: "https://cdn.pixabay.com/photo/2015/09/09/19/49/dessert-932884_1280.jpg",
      },
    ];

    // Criar 10 restaurantes com nomes e endereços fictícios
    const restaurants = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const restaurant = await prisma.restaurant.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      });

      for (const plate of plates) {
        await prisma.plate.create({
          data: {
            name: plate.name,
            description: plate.description,
            price: plate.price,
            imageUrl: plate.imageUrl,
            restaurant: {
              connect: {
                id: restaurant.id,
              },
            },
          },
        });
      }

      restaurants.push(restaurant);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar os restaurantes:", error);
  }
}

seedDatabase();