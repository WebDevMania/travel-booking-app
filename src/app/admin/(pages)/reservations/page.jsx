"use client"
import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import { getAllReservations } from '../../services/service'
import { ClipLoader } from 'react-spinners'
import { DataTable } from '../../components/Data-table'
import { columns } from './table/Columns'

const Reservations = () => {
  const { data: allReservations, isPending } = useQuery({
    queryFn: getAllReservations,
    queryKey: ["admin", "reservations"]
  })

  if (isPending) {
    return <ClipLoader />
  }

  return (
    <AdminLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
          All Reservations
        </h2>
        <div className="mt-2 h-2/3 w-[50vw]">
          <DataTable
            columns={columns}
            data={allReservations}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Reservations