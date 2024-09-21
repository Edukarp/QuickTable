"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const cancelBooking = async (bookingId: string) => {

    // Primeiro apague a reserva
    await db.booking.delete({
        where: {
            id: bookingId,
        },
    });

    // Depois faça o revalidate da rota
    revalidatePath("/bookings");
};