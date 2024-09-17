"use client"

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantInfoProps{
    restaurant: Restaurant; 
}

const RestaurantInfo = ({restaurant}: RestaurantInfoProps) => {
    const router = useRouter();
    const handleBackClick = () => {
        router.replace("/")
    }
    return (  
        <div>
            <div className="h-[250px] w-full relative">
                <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 absolute top-4 left-4">
                    <ChevronLeftIcon />
                </Button>
                <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
                    <MenuIcon />
                </Button>
                <Image src={restaurant.imageUrl} alt={restaurant.name} fill style={{objectFit: "cover"}} className="opacity-75"/>
            </div>

            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold">{restaurant.name}</h1>
                <div className="flex item-center gap-1 mt-2">
                    <MapPinIcon className="text-primary" size={17}/>
                    <p className="text-sm">{restaurant.address}</p>
                </div>
                <div className="flex item-center gap-1 mt-2">
                     <StarIcon className="text-primary" size={17}/>
                     <p className="text-sm">5,0 (379 avaliações)</p>
                </div>
            </div>
        </div>



    );
}
 
export default RestaurantInfo;