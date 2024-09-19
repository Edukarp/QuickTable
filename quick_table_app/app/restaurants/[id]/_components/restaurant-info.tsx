"use client"

import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar"
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, Loader2, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { Card, CardContent } from "@/app/_components/ui/card";
import { format, set, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/saveBooking";
import { toast } from "sonner";


interface RestaurantInfoProps{
    restaurant: Restaurant; 
    isAuthenticated?: boolean;
}

const RestaurantInfo = ({restaurant, isAuthenticated}: RestaurantInfoProps) => {

    const router = useRouter();

    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()
    const [submitIsLoading, setSubmitIsLoading] = useState(false);
    const [sheetIsOpen, setSheetIsOpen] = useState(false);

    const {data} = useSession();

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : [];
    }, [date]);


    const handleBackClick = () => {
        router.replace("/");
    }
    const handleBookingClick = () => {
        if(!isAuthenticated) {
            return signIn("google");
        }
    }

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined);
    }
    const handleHourClick = (time: string) => {
        setHour(time);
    }

    const handleBookingSubmit = async () => {
        try{
            setSubmitIsLoading(true);
            if(!date || !hour || !data?.user){
                return;
            }

            const dateHour = Number(hour.split(":")[0]);
            const dateMinutes = Number(hour.split(":")[1]);

            const newDate = setMinutes(setHours(date, dateHour), dateMinutes);


            await saveBooking({
                restaurantId: restaurant.id, 
                date: newDate,
                userId: data.user.id
            });

            setSheetIsOpen(false);
            setHour(undefined);
            setDate(undefined);
            toast("Reserva efetuada com sucesso!", {
                description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.' ",{
                    locale: ptBR,
                }),
                action: {
                    label: "Vizualizar",
                    onClick: () => router.push("/bookings")
                },
            });
        } catch(error){
            console.error(error)
        } finally {
            setSubmitIsLoading(false);
        }
    }    

    return (  
        <div>
            <div className="h-[250px] w-full relative">
                <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 absolute top-4 left-4">
                    <ChevronLeftIcon />
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
                            <MenuIcon />
                        </Button>

                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu/>
                        
                    </SheetContent>
                </Sheet>

                <Image src={restaurant.imageUrl} alt={restaurant.name} fill style={{objectFit: "cover"}} className="opacity-75"/>
            </div>
            <div className="flex justify-between">
                <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary w-full">
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

                <div className="pr-8 py-10">
                    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="secondary" className="text-primary" onClick={handleBookingClick}>
                                Reservar
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                <SheetTitle>Fazer Reserva</SheetTitle>
                            </SheetHeader>
                            <div className="py-6">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateClick}
                                    locale={ptBR}
                                    fromDate={new Date()}
                                    styles={{
                                        head_cell:{
                                            width: "100%",
                                            textTransform: "capitalize",
                                        },
                                        cell: {
                                            width: "100%",
                                        },
                                        button: {
                                            width: "100%",
                                        },
                                        nav_button_previous: {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        nav_button_next: {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        caption:{
                                            textTransform: "capitalize",
                                        }
                                    }}
                                />
                            </div>
                            {date && (
                                <div className=" flex gap-3 overflow-x-auto py-6, px-5 mb-4 [&::-webkit-scrollbar]:hidden">
                                    {timeList.map((time) => (
                                        <Button variant={hour == time ? "default" : "outline"} className="rounded-full pt-2" key={time} onClick={() => handleHourClick(time)}>{time}</Button>
                                    ))}
                                </div>
                            )}

                            <div className="py-4 px-5 border-t border-solid border-secondary">
                                <Card>
                                    <CardContent className="p-3">
                                        <div className="flex justify-between">
                                            <h2 className="font-bold">{restaurant.name}</h2>
                                        </div>
                                        <div className="flex justify-between pb-2">
                                            <h2 className="text-sm text-gray-400">{restaurant.address}</h2>
                                        </div>
                                        {date && (
                                            <div className="flex justify-between">
                                                <h3 className="text-gray-400">Data</h3>
                                                <h4 className="text-sm">{format(date, "dd 'de ' MMMM", {locale: ptBR})}</h4>
                                            </div>

                                        )}
                                        {hour && (
                                            <div className="flex justify-between">
                                                <h3 className="text-gray-400">Horário</h3>
                                                <h4 className="text-sm">{hour}</h4>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                            <SheetFooter>
                                    <Button onClick={handleBookingSubmit} disabled={!date || !hour || submitIsLoading}>
                                        {submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Confirmar Reserva
                                    </Button>
                            </SheetFooter>


                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>



    );
}
 
export default RestaurantInfo;