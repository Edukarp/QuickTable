"use client"

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Restaurant } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface RestaurantItemProps{
    restaurant: Restaurant;
}


const RestaurantItem = ({restaurant}: RestaurantItemProps) => {
    const router = useRouter();
    const handleBookingClick = () => {
        router.push(`/restaurants/${restaurant.id}`);
    }

    return (
        <Card className="min-w-full max-w-full rounded-2xl">
            <CardContent className="p-0 py-0">
                <div className="relative w-full h-[159px]">

                    <div className="absolute top-2 left-2 z-50">
                        <Badge className="flex gap-1 items-center opacity-90" variant="secondary">
                            <StarIcon size={12} className="fill-primary text-primary"/>
                            <span className="text-xs">5.0</span>
                        </Badge>
                    </div>

                    <Image alt={restaurant.name} src={restaurant.imageUrl} 
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-[159px] w-full rounded-2xl"
                    style={{objectFit: "cover"}}
                    fill
                    />
                </div>

                <div className="px-3 pb-3">
                <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{restaurant.name}</h2>
                <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{restaurant.address}</p>
                <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                </div>
            </CardContent>
        </Card>
      );
};
 
export default RestaurantItem;