import { z } from "zod";

export const createDishSchema = z.object({
    name: z.string({ required_error: "Invalid name!" }).min(1),
    ingredients: z
        .array(z.string({ required_error: "Ingredients must be provided!" }))
        .nonempty("Ingredients cannot be empty"),
});

export type createDishRequest = z.infer<typeof createDishSchema>