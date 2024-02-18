"use client"
import { useForm } from "react-hook-form"
import Input from '@/ui/Input'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./schema"
import Select from "@/ui/Select"
import { optionLocations, optionTypes } from "@/data/data"
import Button from "@/ui/Button"
import { toast } from "react-hot-toast"
import { createNewListing, postImages } from "./service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import ModalLayout from "../../layout/ModalLayout"

const CreateModal = ({
  handleHideModal
}) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET
  const router = useRouter()
  const [images, setImages] = useState([])

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ data, imageUrls }) => createNewListing(data, imageUrls),
    mutationKey: ["listings"]
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      desc: "",
      beds: 5,
      hasFreeWifi: false,
      type: "luxury",
      location: "dubai",
      pricePerNight: 123
    }
  })

  useEffect(() => {
    if (Object.keys((errors)).length > 0) {
      Object.keys((errors)).map((key) => {
        toast.error(errors[key].message)
      })
    }
  }, [errors])

  const handleImage = (e) => {
    setImages((prev) => {
      return [...prev, e.target.files[0]]
    })
  }

  const uploadImage = async (image, idx) => {
    if (!image) return

    const toastId = toast.loading(`Image ${idx + 1} is being uploaded`)

    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
      const imageUrl = await postImages(CLOUD_NAME, formData)
      toast.success(`Successfully uploaded image ${idx + 1}`)
      toast.dismiss(toastId)

      return imageUrl
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (data) => {
    if (!images?.length) return toast.error("You must publish an image!")

    const imageUrls = await Promise.all(images.map((image, idx) => {
      const imageUrl = uploadImage(image, idx)
      return imageUrl
    }))

    const newListing = await mutateAsync({ data, imageUrls })
    toast.success("Redirecting to listing...")
    router.push(`/details/${newListing.id}`)
  }


  return (
    <ModalLayout
      isCreating
      document="listing"
      handleHideModal={handleHideModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
        <Input
          type="text"
          className="text-slate-400 w-[400px] outline-none p-2"
          register={register("name")}
          placeholder="Arabian Paradise"
        />
        <Input
          type="text"
          className="text-slate-400 w-[400px] outline-none p-2"
          register={register("desc")}
          placeholder="This hotel is amazing. It has this view...."
        />
        <Select
          data={optionLocations}
          className="text-slate-400 w-[400px] outline-none p-2 ml-2"
          register={register("location")}
        />
        <Select
          data={optionTypes}
          className="text-slate-400 w-[400px] outline-none p-2 ml-2"
          register={register("type")}
        />
        <Input
          type="number"
          className="text-slate-400 w-[400px] outline-none p-2"
          register={register("pricePerNight", { valueAsNumber: true })}
          step={0.01}
          placeholder="$249.00"
        />
        <Input
          type="number"
          className="text-slate-400 w-[400px] outline-none p-2"
          register={register("pricePerNight", { valueAsNumber: true })}
          step={1}
        />
        <div className="text-slate-400 ml-4 w-[400px] flex items-center gap-4">
          <label htmlFor="freeWifi">
            Free Wifi
          </label>
          <Input
            register={register("hasFreeWifi")}
            type="checkbox"
            id="freeWifi"
            className="w-4 h-4"
          />
        </div>
        <label className="text-slate-400 w-[400px] ml-4" htmlFor="images">
          Upload images
        </label>
        <input
          onChange={handleImage}
          type="file"
          className="text-slate-400"
          style={{ display: "none" }}
          id="images"
        />
        <Button
          disabled={isLoading}
          className="w-[400px] bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
          label="Submit"
        />
      </form>
    </ModalLayout>
  )
}

export default CreateModal