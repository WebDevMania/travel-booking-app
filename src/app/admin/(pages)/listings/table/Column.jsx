"use client"

import Image from "next/image"
import { FaPen, FaTrash } from "react-icons/fa"
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"
import { useState } from "react"
import { useListingHook } from "@/app/admin/hooks/listing-hook"
import ListingModal from "@/app/admin/modals/listing-modal/ListingModal"

export const columns = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.original?.imageUrls[0]

            return (
                <div>
                    <Image
                        className="rounded-full object-cover"
                        width="35"
                        height="35"
                        src={image}
                        alt="Listing's image"
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            const location = row.getValue("location")

            return (
                <span className="capitalize">
                    {location}
                </span>
            )
        }
    },
    {
        accessorKey: "pricePerNight",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price per night
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => {
            const pricePerNight = row.getValue("pricePerNight")

            return (
                <span>
                    ${pricePerNight}
                </span>
            )
        }
    },
    {
        accessorKey: "beds",
        header: "Beds"
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const listingId = row.original.id
            const [showModal, setShowModal] = useState(false)

            const { handleDeleteListing, isPending } = useListingHook()
            const handleHideModal = () => setShowModal(false)
            const handleShowModal = () => setShowModal(true)

            return (
                <>
                    <button
                        onClick={() => handleDeleteListing(listingId)}
                        disabled={isPending}
                        className="cursor-pointer px-2 py-1 rounded-xl"
                    >
                        <FaTrash
                            color={`${isPending ? "#bdb2b2" : "#f00"}`}
                        />
                    </button>
                    <button
                        onClick={handleShowModal}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaPen
                            color="#31b608"
                        />
                    </button>
                    {showModal && (
                        <ListingModal
                            handleHideModal={handleHideModal}
                            listingId={listingId}
                        />
                    )}
                </>
            )
        }
    },
]