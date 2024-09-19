"use server";

import { db } from "@/app/_lib/prisma";

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
}