import { z } from "zod";

export const createDishSchema = z.object({
    name: z.string({ required_error: "Invalid name!" }).min(1),
    ingredients: 
        z.array(z.object({
            name: z.string({required_error: "Invalid ingridient name!"}).min(1),
            hasGluten: z.boolean({required_error: "Missing filed hasGluten on ingridient!"}),
            isAnimal: z.boolean({required_error: "Missing filed isAnimal on ingridient!"}),
            isMeat: z.boolean({required_error: "Missing filed isMeat on ingridient!"})
        }, {required_error: "Invalid ingridient!"}))
        .nonempty("Ingredients cannot be empty"),
});

export type createDishRequest = z.infer<typeof createDishSchema>