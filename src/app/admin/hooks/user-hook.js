import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../(pages)/users/service"
import { toast } from "react-hot-toast"

export const useUserHook = () => {
    const queryClient = useQueryClient()

    const { mutate: handleDeleteUser, isPending } = useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess: handleSuccess
    })

    function handleSuccess() {
        toast.success("Successfully deleted the user")
        queryClient.invalidateQueries({
            queryKey: ["admin", "users"]
        })
    }

    return {
        handleDeleteUser,
        isPending
    }
}