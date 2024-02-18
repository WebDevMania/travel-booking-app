import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteReview } from "../services/service"

export const useReviewHook = () => {
    const queryClient = useQueryClient()

    const { mutate: handleDeleteReview, isPending } = useMutation({
        mutationFn: (id) => deleteReview(id),
        onSuccess: handleSuccess
    })

    function handleSuccess() {
        toast.success("Successfully deleted the review!")
        queryClient.invalidateQueries({
            queryKey: ["admin", "reviews"]
        })
    }

    return {
        handleDeleteReview,
        isPending
    }
}