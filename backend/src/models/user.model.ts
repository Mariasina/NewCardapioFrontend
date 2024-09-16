import { model, Schema } from "mongoose";

interface IUser {
    username: string,
    password: string,
    isAdmin: boolean

}


const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
})

const User = model<IUser>('User', userSchema)

export default User