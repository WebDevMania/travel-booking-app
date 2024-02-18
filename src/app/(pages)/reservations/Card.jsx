import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'

const Card = ({
    reservation,
    mutate
}) => {
    return (
        <div className="w-[300px] min-h-full flex flex-col">
            <Link href={`/details/${reservation.listingId}`}>
                <Image
                    src={reservation.listing.imageUrls[0]}
                    className="rounded-xl shadow-xl"
                    height="200"
                    width="300"
                />
            </Link>
            <div className="p-2 mt-2 flex flex-col gap-4">
                <span className="font-semibold text-lg">
                    {reservation.listing.location}
                </span>
                <span>
                    {reservation.listing.name}
                </span>
                <div>
                    <span className="text-slate-500">
                        {format(reservation.startDate, "MMM do yyyy")}
                    </span>
                    <span className="px-2">-</span>
                    <span className="text-slate-500">
                        {format(reservation.endDate, "MMM do yyyy")}
                    </span>
                </div>
                <div>
                    Total price: ${reservation.daysDifference * reservation.listing.pricePerNight}
                </div>
                <button
                    onClick={() => {
                        mutate({
                            chargeId: reservation.chargeId,
                            reservationId: reservation.id
                        })
                    }}
                    className="w-full py-2 bg-red-500 text-white rounded-xl transition-all hover:bg-red-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Card