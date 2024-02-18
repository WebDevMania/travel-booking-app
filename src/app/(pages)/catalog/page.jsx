"use client"
import React, { useEffect } from 'react'
import Select from '@/ui/Select'
import { optionLocations, optionTypes } from '@/data/data'
import Input from '@/ui/Input'
import Button from '@/ui/Button'
import Card from '@/components/best-hotels/Card'
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./schema"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFilteredListings } from "./service"
import Image from "next/image"
import { toast } from 'react-hot-toast'

const Catalog = () => {
  const searchParams = useSearchParams()

  const city = searchParams.get("city")
  const min_price = searchParams.get("min_price")
  const max_price = searchParams.get("max_price")
  const type = searchParams.get("type")
  const router = useRouter()

  const {
    city: city_name,
    value,
    image
  } = optionLocations.find(location => location.value === city)

  console.log(city_name, value, image)

  const defaultValues = {
    location: value,
    min_price,
    max_price,
    type
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: {
      errors
    }
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  })

  const queryClient = useQueryClient()
  const { data: listings, isPending } = useQuery({
    queryFn: () => getFilteredListings(getValues()),
    queryKey: ["listings"]
  })

  useEffect(() => {
    if (errors) {
      Object.keys(errors).map((key) => {
        toast.error(errors[key]?.message)
      })
    }
  }, [errors])

  const onSubmit = async (data) => {
    await getFilteredListings(data)

    queryClient.invalidateQueries(["listings"])

    const newUrl = `/catalog?city=${data.location}&min_price=${data.min_price}&max_price=${data.max_price}&type=${data.type}`

    router.push(newUrl, { scroll: false })
  }


  return (
    <div className="min-h-screen w-full">
      <div className="relative h-3/5 w-full">
        <Image
          src={image}
          className="brightness-50 h-screen w-full object-cover"
        />
        <h3
          className="absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white"
        >
          {city_name}
        </h3>
      </div>
      <div className="relative z-20 -mt-12 h-full w-full flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center">
          <div className="flex flex-col items-center gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold">
              City
            </h3>
            <Select
              register={register("location")}
              data={optionLocations}
              className="text-blue-800 p-2 rounded-xl outline-none captalize"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold">
              Price
            </h3>
            <div className="flex items-center gap-2">
              <Input
                register={register("min_price", { valueAsNumber: true })}
                type="number"
                placeholder="Min. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
              <Input
                register={register("max_price", { valueAsNumber: true })}
                type="number"
                placeholder="Max. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold">
              Type of hotel
            </h3>
            <Select
              register={register("type")}
              data={optionTypes}
              className="text-blue-800 p-2 rounded-xl outline-none"
            />
          </div>
          <Button
            disabled={isPending}
            label="Search"
            className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
          />
        </form>
        <div className="w-full mt-36 flex flex-wrap justify-center items-center gap-14">
          {listings?.length > 0 ? listings.map((place, idx) => (
            <Card
              key={idx}
              place={place}
            />
          )) : <h2 className="text-center font-bold text-4xl text-slate-700">No listing with those filters</h2>}
        </div>
      </div>
    </div>
  )
}

export default Catalog