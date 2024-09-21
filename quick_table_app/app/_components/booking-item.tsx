"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include:{
            restaurant: true;
        };
    }>;
}

const BookingItem = ({booking}: BookingItemProps) => {

    const isBookingConfirmed = isFuture(booking.date);

    const [isDeleteLoading, setDeleteLoading] = useState(false);

    const handleCancelClick = async () => {

        setDeleteLoading(true);

        try{
            await cancelBooking(booking.id);
            toast.success("Reserva Cancelada com Sucesso!")

        }catch(error){
            console.error(error)
        }finally{
            setDeleteLoading(false);
        }
    }

    return ( 
        <Sheet>
            <SheetTrigger asChild>
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
                                <p className="text-sm">{format(booking.date, "HH:mm") }	</p>

                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent className="px-0">
                <SheetHeader className="text-left px-5 pb-6 border-b border-solid border-secondary">
                    <SheetTitle>Informações da Reserva</SheetTitle>
                </SheetHeader>
                <div className="px-5">
                        
                    <div className="relative h-[180px] w-full mt-6">
                        <Image src="/restaurant-map.png" alt={booking.restaurant.name} fill className="" />

                        <div className="w-full absolute bottom-4 left-0 px-5">
                            <Card>
                                <CardContent className="p-3 flex gap-2">
                                    <Avatar>
                                        <AvatarImage src={booking.restaurant.imageUrl}/>
                                    </Avatar>
                                    <div>
                                        <h2 className="font-bold">{booking.restaurant.name}</h2>
                                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.restaurant.address}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>

                    <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit mt-3 mb-6">
                        {isBookingConfirmed ? "Reservado" : "Finalizado"}
                    </Badge>

                        <Card>
                            <CardContent className="p-3">
                                <div className="flex justify-between">
                                     <h2 className="font-bold">{booking.restaurant.name}</h2>
                                </div>
                                <div className="flex justify-between pb-2">
                                    <h2 className="text-sm text-gray-400">{booking.restaurant.address}</h2>
                                </div>
                                    <div className="flex justify-between">
                                        <h3 className="text-gray-400">Data</h3>
                                        <h4 className="text-sm">{format(booking.date, "dd 'de ' MMMM", {locale: ptBR})}</h4>
                                    </div>
                                    <div className="flex justify-between">
                                        <h3 className="text-gray-400">Horário</h3>
                                         <h4 className="text-sm">{format(booking.date, "HH:mm")}</h4>
                                         
                                    </div>
                            </CardContent>
                        </Card>

                    <SheetFooter className="flex-row gap-3 mt-4">
                        <SheetClose asChild>
                            <Button className="w-full" variant="secondary">Voltar</Button>
                        </SheetClose>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button  disabled={!isBookingConfirmed || isDeleteLoading} className="w-full" variant="destructive">
                                    {isDeleteLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
                                    Cancelar Reserva
                                 </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Deseja cancelar esta reserva?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Uma vez cancelada não será possivél reverter essa ação
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row gap-3 ">
                                    <AlertDialogCancel className="w-full mt-0" >Voltar</AlertDialogCancel>
                                    <AlertDialogAction disabled={isDeleteLoading} onClick={handleCancelClick} className="w-full" >
                                        {isDeleteLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>

                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
     );
}
 
export default BookingItem;