"use client"

import { Avatar, AvatarImage } from "./ui/avatar";
import { LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { useSession, signOut, signIn } from "next-auth/react";

const SideMenu = () => {
    const { data } = useSession();

    const handleLogout = () => signOut();
    const handleLogin = () => signIn("google");

    return (
        <div>
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
                <div className="flex justify-between px-5 py-6 items-center">
                    <div className="flex item-center gap-3" >
                        <Avatar>
                            <AvatarImage src={data.user?.image ?? ""} />
                        </Avatar>
                        <h2 className="font-bold">{data.user.name}</h2>
                    </div>
                    <Button variant="secondary" size="icon">
                        <LogOutIcon onClick={handleLogout} />
                    </Button>
                </div>


            ) : (
                <div className="flex flex-col  gap-3 px-5 py-6">
                    <div className="flex item-center gap-2">
                        <UserIcon size={32} />
                        <h2 className="font-bold">Olá, faça seu login!</h2>
                    </div>
                    <Button onClick={handleLogin} variant="secondary" className="w-full justify-start">
                        <LogInIcon className="mr-2" size={18} />
                        Fazer Login
                    </Button>

                </div>
            )}

            <div className="flex flex-col gap-3">
                <Button variant="outline" className="justify-start" asChild>
                    <Link href="/">
                        <HomeIcon size={18} className="mr-2" />
                        Início
                    </Link>
                </Button>

                {data?.user && (
                    <Button variant="outline" className="justify-start" asChild>
                        <Link href="/bookings">
                            <CalendarIcon size={18} className="mr-2" />
                            Reservas
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default SideMenu;