import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteReservation } from "@/app/(pages)/reservations/service"

export const useReservationHook = () => {
    const queryClient = useQueryClient()

    const { mutate: handleDeleteReservation, isPending } = useMutation({
        mutationFn: ({ chargeId, reservationId }) => deleteReservation({ chargeId, reservationId }),
        onSuccess: handleSuccess
    })

    function handleSuccess() {
        toast.success("Successfully deleted a reservation")
        queryClient.invalidateQueries({
            queryKey: ["admin", "reservations"]
        })
    }

    return {
        handleDeleteReservation,
        isPending
    }
}