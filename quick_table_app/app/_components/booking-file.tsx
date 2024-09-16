import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return ( 
        <Card>
            <CardContent className="p-5 flex justify-between py-0">
                <div className="flex flex-col gap-2 py-5">
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Reservado</Badge>
                    <h2 className="font-bold"> Restaurante Teste </h2>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://cdn.pixabay.com/photo/2016/11/18/22/21/restaurant-1837150_1280.jpg"/>
                            <AvatarFallback> R </AvatarFallback>
                        </Avatar>
                        <h3>Praça dos Sabores, 789</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center px-3 border-l border-solid border-secondary">
                        <p className="text-sm">Outubro</p>
                        <p className="text-2xl">06</p>
                        <p className="text-sm">19:45</p>

                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem;