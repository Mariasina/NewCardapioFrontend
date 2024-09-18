import { Schema, model } from "mongoose"

export interface IDish {
    name: string,
    ingredients: string[]
}

const dishSchema = new Schema<IDish>({
    name: {type: String, required: true, unique: true},
    ingredients: {type: [String], required: true}
})

export const Dish = model("Dishes", dishSchema)