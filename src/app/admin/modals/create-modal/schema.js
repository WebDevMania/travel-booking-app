import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod"

const schema = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    desc: z.string().min(1, { message: "Description is required!" }),
    beds: z.number().min(1, { message: "Beds are required!" }),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(optionTypes.map(({ value }) => value)),
    location: z.enum(optionLocations.map(({ value }) => value)),
    pricePerNight: z.number().min(15, { message: "Price must be above $15!" }).max(50000, { message: "Price can't be above $50k!" })
})

export {
    schema
}