import Header from "../_components/header";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale"
import Search from "./_components/search";
import BookingItem from "../_components/booking-file";
import { db } from "../_lib/prisma";
import RestaurantItem from "./_components/restaurant-item";


export default async function Home() {

  //Chamar prisma e pegar restaurantes
  const restaurants = await db.restaurant.findMany({});
  return (
    <div>

      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold"> Olá Eduardo</h2>
        <p className="capitalize text-sm">
          {format(new Date(),"EEEE',' dd 'de ' MMMM",{
            locale: ptBR,
          } 
          )} </p>
        </div>
      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Reservas</h2>
        <BookingItem />
      </div>

      <div className= "mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

        <div  className="pl-2 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"> 
          {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

    </div>
  );
}
