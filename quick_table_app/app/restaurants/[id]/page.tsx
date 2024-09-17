
import { db } from "@/app/_lib/prisma";

import RestaurantInfo from "./_components/restaurant-info";

interface RestaurantDetailProps{
    params: {
        id?: string;
    }
}


const RestaurantDetailPage = async ({params} : RestaurantDetailProps) => {
    if(!params.id){
        //TODO: return homepage
        return null;
    }
    const restaurant = await db.restaurant.findUnique({
            where: {
                id: params.id,
            },   
        });

        if(!restaurant){
            //TODO: return homepage
            return null;
        }
        return (
            <div>
                <RestaurantInfo restaurant={restaurant}/>
            </div>
        
        )
}
 
export default RestaurantDetailPage;