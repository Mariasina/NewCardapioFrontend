import { model, Schema } from "mongoose";

export interface IIngredient {
    name: string,
    hasGluten: boolean,
    isAnimal: boolean,
    isMeat: boolean
}

const ingredientSchema = new Schema<IIngredient>({
    name: {type: String, required: true},
    hasGluten: {type: Boolean, required: true},
    isAnimal: {type: Boolean, required: true},
    isMeat: {type: Boolean, required: true}
})

const Ingredient = model<IIngredient>('Ingredient', ingredientSchema)

export default Ingredient