import { format } from "date-fns"
import { FaTrash } from "react-icons/fa"
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import { useReviewHook } from "@/app/admin/hooks/review-hook"

export const columns = [
    {
        accessorKey: "stars",
        header: ({ column }) => {
            return (
                <button
                    className="flex justify-center items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted === "asc")}
                >
                    Stars
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("stars")

            return (
                <span>
                    {value}
                </span>
            )
        }
    },
    {
        accessorKey: "text",
        header: "Text",
        cell: ({ row }) => {
            const text = row.getValue("text")

            return (
                <span>
                    {text}
                </span>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) => {
            const value = row.getValue("createdAt")

            return (
                <span>
                    {format(value, "MMM do yyyy")}
                </span>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const id = row.original.id
            const { handleDeleteReview, isPending } = useReviewHook()

            return (
                <>
                    <button
                        onClick={() => handleDeleteReview(id)}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaTrash color={`${isPending ? "#bdb2b2" : "#f00"}`} />
                    </button>
                </>
            )
        }
    },
]