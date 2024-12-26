import mongoose from "mongoose";
import { Schema } from "mongoose";
import PassportLocalMongoose from "passport-local-mongoose";

let newUser = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    favorites: {
        type: Array
    }
});

newUser.plugin(PassportLocalMongoose);

const User = mongoose.model("User", newUser);

export default User;