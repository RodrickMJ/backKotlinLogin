import mongoose, { Document, Schema } from "mongoose";
import UserInterface from "./UserInterface";

interface userDocument extends Omit<UserInterface, 'id'>, Document { }

const UserSchema = new Schema<userDocument>({
    imageUrl: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        enum: ['Administrador', 'Investigador'],
        required: true
    },

    passwordResetCode: {
        type: String,
        required: false
    },
    passwordResetExpires: {
        type: Date,
        required: false
    }

});

const UserModel = mongoose.model<userDocument>('Users', UserSchema);

export default UserModel;