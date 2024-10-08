"use client"

import { Card, CardContent } from "@/app/_components/ui/card";
import { Plate } from "@prisma/client";
import Image from "next/image";

interface PlateItemProps {
    plate: Plate;

}

const PlateItem = ({plate}: PlateItemProps) => {

    return (
        <Card>
            <CardContent className="p-3 w-full">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image className="rounded-lg" src={plate.imageUrl} alt={plate.name} fill style={{objectFit: "cover"}}/>
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{plate.name}</h2>
                        <p className="text-sm text-gray-400">{plate.description}</p>

                        <div className="flex item-center justify-between mt-3">
                            <p className="text-primary font-bold">
                                {Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(Number(plate.price))}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>    
     );
}
 
export default PlateItem;