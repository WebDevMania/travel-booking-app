import { useQueries } from "@tanstack/react-query";
import { getMostReservedListings } from "../modals/create-modal/service"
import {
    getAllListings,
    getAllReservations,
    getAllRevenue,
    getAllUsers
} from "../services/service"

export const useWidgetHook = () => {
    const [
        usersQuery,
        listingsQuery,
        reservationsQuery,
        revenueQuery,
        mostReservedQuery
    ] = useQueries({
        queries: [
            {
                queryFn: getAllUsers,
                queryKey: ["admin", "users"]
            },
            {
                queryFn: getAllListings,
                queryKey: ["admin", "listings"]
            },
            {
                queryFn: getAllReservations,
                queryKey: ["admin", "reservations"]
            },
            {
                queryFn: getAllRevenue,
                queryKey: ["admin", "revenue"]
            },
            {
                queryFn: getMostReservedListings,
                queryKey: ["admin", "most-reserved-listing"]
            },
        ]
    })

    return [
        usersQuery,
        listingsQuery,
        reservationsQuery,
        revenueQuery,
        mostReservedQuery
    ]
}