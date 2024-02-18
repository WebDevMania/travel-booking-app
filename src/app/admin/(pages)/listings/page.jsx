"use client"
import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { DataTable } from '../../components/Data-table'
import { useQuery } from '@tanstack/react-query'
import { getAllListings } from '../../services/service'
import { ClipLoader } from 'react-spinners'
import { columns } from './table/Column'

const Listings = () => {
  const { data: allListings, isPending } = useQuery({
    queryFn: getAllListings,
    queryKey: ["admin", "listings"]
  })

  if (isPending) return <ClipLoader />

  return (
    <AdminLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
          All Listings
        </h2>
        <div className="mt-2 h-2/3 w-[50vw]">
          <DataTable
            columns={columns}
            data={allListings}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Listings