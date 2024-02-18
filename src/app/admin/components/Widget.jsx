import Link from 'next/link'
import React from 'react'

const Widget = ({
    page,
    data,
    icon
}) => {
    return (
        <div className="w-full h-48 p-4 transition-all shadow-md hover:shadow-lg rounded-xl cursor-pointer">
            <div className="w-full h-full flex flex-col justify-between">
                <div className="flex justify-between">
                    <h2 className="font-bold text-[18px] uppercase text-[#b6b0b0]">
                        {page}
                    </h2>
                    <span>
                        {page !== "revenue" ? data?.length : `$${data}`}
                    </span>
                </div>
                <div className="flex justify-between">
                    <Link className="border-b transition hover:border-slate-500" href={`/admin/${page}`}>
                        See all
                    </Link>
                    <span className="h-8 w-8 flex justify-center items-center rounded-full bg-blue-400">
                        {icon}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Widget