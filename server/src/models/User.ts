import mongoose, { Schema, Document, Model } from "mongoose";

export type Provider = "local" | "google" | "github";

export interface IAccount {
    provider: Provider;
    providerId: string;
    passwordHash?: string;
}

export interface IUser extends Document{
    email: string;
    displayName: string;
    accounts: IAccount[];
}

const AccountSchema = new Schema<IAccount>({
    provider: { type: String, enum: ["local", "google", "github"], required: true },
    providerId: { type: String },
    passwordHash: { type: String }
},{ _id: false });

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, lowercase:true },
    displayName: { type: String },
    accounts: { type: [AccountSchema], default: [] },
}, { timestamps: true });

UserSchema.index({ email: 1 }, {unique: true});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;