import mongoose, {Schema, Document, Model, Types} from "mongoose";

export interface IShoppingList extends Document {
    userId: Types.ObjectId;
    name: string;
    quantity: number;
    have: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ShoppingListSchema = new Schema<IShoppingList>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    have: { type: Boolean, default: false }
},{ timestamps: true });

const ShoppingList: Model<IShoppingList> = mongoose.model<IShoppingList>("ShoppingList", ShoppingListSchema);
export default ShoppingList;