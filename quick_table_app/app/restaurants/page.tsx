import { redirect } from "next/navigation"
import RestaurantItem from "../(home)/_components/restaurant-item"
import Header from "../_components/header"
import { db } from "../_lib/prisma"

interface RestaurantPageProps {
    searchParams: {
        search?: string
    }
}

const RestaurantPage = async ({ searchParams }: RestaurantPageProps) => {
    if (!searchParams.search) {
        redirect("/");
    }
    const restaurants = await db.restaurant.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: "insensitive"
            }
        }
    })
    return (
        <>
            <Header />  
            <div  className="px-5 py-6">
                <h1 className="text-gray-400 font-bold text-xs uppercase">
                    Resultados para &quot;{searchParams.search}&quot;
                </h1>
                <div className="grid grid-cols-2 mt-3 gap-4">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className="w-full">
                            <RestaurantItem  restaurant={restaurant} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
 
export default RestaurantPage;