
import { db } from "@/app/_lib/prisma";

import RestaurantInfo from "./_components/restaurant-info";
import PlateItem from "./_components/plate-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface RestaurantDetailProps{
    params: {
        id?: string;
    }
}


const RestaurantDetailPage = async ({params} : RestaurantDetailProps) => {
    const session = await  getServerSession(authOptions);
    if(!params.id){
        //TODO: return homepage
        return null;
    }
    const restaurant = await db.restaurant.findUnique({
            where: {
                id: params.id,
            },
            include: {
                plates: true,
            },   
        });

        if(!restaurant){
            //TODO: return homepage
            return null;
        }
        return (
            <div>
                <RestaurantInfo restaurant={restaurant}/>
                <div className="px-5 flex flex-col gap-4 py-6">
                    {restaurant.plates.map((plate) => (
                        <PlateItem key={plate.id} plate={plate} isAuthenticated={!!session?.user}/>
                    ))}
                </div>
            </div>
        
        )
}
 
export default RestaurantDetailPage;