"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingParams {
    restaurantId: string;
    userId: string;
    date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
    await db.booking.create({ 
        data: {
            restaurantId: params.restaurantId,
            userId: params.userId,
            date: params.date
            
        } });

    revalidatePath("/bookings");
    revalidatePath("/");
}