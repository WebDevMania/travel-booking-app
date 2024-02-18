"use client"
import React from 'react'
import AdminLayout from '../../layout/AdminLayout'
import { DataTable } from '../../components/Data-table'
import { columns } from './table/Columns'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../../services/service'
import { ClipLoader } from 'react-spinners'

const Users = () => {

  const { data: allUsers, isPending } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["admin", "users"]
  })

  console.log(allUsers)

  if (isPending) return <ClipLoader />

  return (
    <AdminLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-800 font-semibold">
          All Users
        </h2>
        <div className="mt-2 h-2/3 w-[50vw]">
          <DataTable
            columns={columns}
            data={allUsers}
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Users