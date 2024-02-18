"use client"
import listing_image from "../../../public/assets/hr_1.jpg"
import React from 'react'
import Card from "./Card"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteReservation, getUserReservations } from "./service"
import { toast } from "react-hot-toast"

const Reservations = () => {

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: getUserReservations,
  })

  const { mutate } = useMutation({
    mutationFn: ({ chargeId, reservationId }) => deleteReservation({ chargeId, reservationId }),
    onSuccess: handleSuccess
  })

  function handleSuccess() {
    toast.success("Successfully deleted a reservation")
    queryClient.invalidateQueries({
      queryKey: ["reservations"]
    })
  }

  return (
    <div className="mt-24 px-16 min-h-screen w-full">
      <div className="h-full w-full flex flex-wrap gap-12">
        {data?.length > 0 ? data?.map((reservation) => (
          <Card
            key={reservation.id}
            reservation={reservation}
            mutate={mutate}
          />
        )) : <h1 className="text-center text-3xl font-bold text-slate-700">You have no reservations.</h1>}
      </div>
    </div>
  )
}

export default Reservations