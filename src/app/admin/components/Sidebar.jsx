"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillStar, AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { MdDashboard, MdHotel } from 'react-icons/md'

const Sidebar = () => {
    const currentPage = usePathname().split("/")[2]

    const sidebarData = [
        {
            text: "Dashboard",
            icon: MdDashboard,
            href: "/admin/dashboard",
            isCurrentPage: currentPage === "dashboard",
        },
        {
            text: "Users",
            icon: AiOutlineUser,
            href: "/admin/users",
            isCurrentPage: currentPage === "users",
        },
        {
            text: "Listings",
            icon: MdHotel,
            href: "/admin/listings",
            isCurrentPage: currentPage === "listings",
        },
        {
            text: "Reservations",
            icon: AiOutlineHome,
            href: "/admin/reservations",
            isCurrentPage: currentPage === "reservations",
        },
        {
            text: "Reviews",
            icon: AiFillStar,
            href: "/admin/reviews",
            isCurrentPage: currentPage === "reviews",
        },
    ]

    return (
        <div className="w-full flex flex-col justify-between">
            <div className="h-full w-full flex flex-col gap-10 col-span-1">
                {sidebarData.map((data) => (
                    <Link
                        href={data.href}
                        key={data.text}
                        className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${data.isCurrentPage && "bg-blue-600"}`}
                    >
                        <span>
                           {
                            <data.icon color={data.isCurrentPage ? "#fff" : "#cec7c7"}/>
                           }
                        </span>
                        <span className={`${data.isCurrentPage ? "text-white" : "text-[#cec7c7]"}`}>
                            {data.text}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar