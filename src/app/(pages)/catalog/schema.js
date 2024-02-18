import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod"

const schema = z.object({
    location: z.enum(optionLocations.map(({ value }) => value)),
    min_price: z.number().min(15, { message: "Price can't be less than $15!" }),
    max_price: z.number().max(50000, { message: "Price can't exceed more than $50k" }),
    type: z.enum(optionTypes.map(({ value }) => value))
})

export {
    schema
}