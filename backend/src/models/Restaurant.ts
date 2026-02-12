import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem {
    name: string;
    description: string;
    price: number;
    image?: string;
    isVeg: boolean;
}

export interface IRestaurant extends Document {
    name: string;
    cuisine: string[];
    address: string;
    rating: number;
    deliveryTime: string;
    image: string;
    menu: IMenuItem[];
}

const MenuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    isVeg: { type: Boolean, default: true },
});

const RestaurantSchema: Schema = new Schema({
    name: { type: String, required: true },
    cuisine: { type: [String], required: true },
    address: { type: String, required: true },
    rating: { type: Number, default: 0 },
    deliveryTime: { type: String, required: true },
    image: { type: String, required: true },
    menu: { type: [MenuItemSchema], default: [] },
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);

