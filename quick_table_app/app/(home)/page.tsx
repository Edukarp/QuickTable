import Header from "../_components/header";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale"
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import RestaurantItem from "./_components/restaurant-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";


export default async function Home() {

  const session = await getServerSession(authOptions);

  const[restaurants, recommendedRestaurants, confirmedBookings] = await Promise.all([
    db.restaurant.findMany({}),
    db.restaurant.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    session?.user ? db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),

        },

      },
      include: {
        restaurant: true,
      },
    })
    : Promise.resolve([]),
  ]);

  return (
    <div>

      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user ? `Ola, ${session.user.name?.split(" ")[0]}!` : "Olá, aonde vamos comer hoje?"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(),"EEEE',' dd 'de ' MMMM",{
            locale: ptBR,
          } 
          )} </p>
        </div>
      <div className="px-5 mt-6">
        <Search defaultValues={undefined} />
      </div>
      {confirmedBookings.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Reservas</h2>
          <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (<BookingItem key={booking.id} booking={booking} />))}
          </div>
        
        </div>
        
      )}

      <div className= "mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

        <div  className="pl-2 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"> 
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="min-w-[167px] max-w-[167px]">
              <RestaurantItem  restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>

      <div className= "mt-6 mb-16">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

        <div  className="pl-2 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"> 
          {recommendedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="min-w-[167px] max-w-[167px]">
                <RestaurantItem restaurant={restaurant} />
              </div>
          ))}
        </div>
      </div>

    </div>
  );
}
