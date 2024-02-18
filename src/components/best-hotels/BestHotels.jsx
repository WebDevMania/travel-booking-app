"use client"
import React from 'react'
import image_1 from '../../../public/assets/hr_1.jpg'
import image_2 from '../../../public/assets/hr_2.jpg'
import image_3 from '../../../public/assets/hr_3.jpg'
import image_4 from '../../../public/assets/hr_4.jpg'
import image_5 from '../../../public/assets/hr_5.jpg'
import image_6 from '../../../public/assets/hr_6.jpg'
import image_7 from '../../../public/assets/hr_7.jpg'
import Card from './Card'
import { useQuery } from '@tanstack/react-query'
import { getBestHotels } from './service'
import { ClipLoader } from 'react-spinners'

const BestHotels = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: getBestHotels
  })

  if (isLoading) {
    const style = {
      marginTop: "5rem",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "100vh"
    }

    return (
      <div style={style}>
        <ClipLoader
          color={"#123abc"}
        />
      </div>
    )
  }

  return (
    <div className="h-full w-full my-36">
      <div className="h-full w-5/6 mx-auto flex flex-col justify-start">
        <h5 className="text-[20px] bg-blue-500 text-white rounded-full p-4 w-max">
          Explore Top
        </h5>
        <h2 className="text-4xl text-slate-800 font-bold mt-6 mb-12">
          Best Hotels
        </h2>
        <div className="flex flex-wrap items-center gap-14">
          {data?.map((place) => (
            <Card
              key={place.id}
              place={place}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BestHotels