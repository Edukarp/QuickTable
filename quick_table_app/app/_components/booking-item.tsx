import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include:{
            restaurant: true;
        };
    }>;
}

const BookingItem = ({booking}: BookingItemProps) => {

    const isBookingConfirmed = isFuture(booking.date);

    return ( 
        <Card className="min-w-full">
            <CardContent className="px-0 flex justify-between py-0">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                    <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit">
                        {isBookingConfirmed ? "Reservado" : "Finalizado"}
                    </Badge>
                    <h2 className="font-bold"> {booking.restaurant.name} </h2>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={booking.restaurant.imageUrl}/>
                            <AvatarFallback> R </AvatarFallback>
                        </Avatar>
                        <h3>{booking.restaurant.address}</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
                        <p className="text-sm capitalize">{format(booking.date, "MMMM", {locale: ptBR,})}</p>
                        <p className="text-2xl">{format(booking.date, "dd")}</p>
                        <p className="text-sm">{format(booking.date, "hh:mm") }	</p>

                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem;