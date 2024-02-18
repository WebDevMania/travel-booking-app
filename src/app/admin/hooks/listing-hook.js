import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteListing } from "../(pages)/listings/service"

export const useListingHook = () => {
    const queryClient = useQueryClient()

    const { mutate: handleDeleteListing, isPending } = useMutation({
        mutationFn: (id) => deleteListing(id),
        onSuccess: handleSuccess
    })

    function handleSuccess() {
        toast.success("Successfully deleted a listing")
        queryClient.invalidateQueries({
            queryKey: ["admin", "listings"]
        })
    }

    return {
        handleDeleteListing,
        isPending
    }
}