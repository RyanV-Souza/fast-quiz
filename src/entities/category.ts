import { model, ObjectId, Schema } from "mongoose";

export interface ICategory {
  id: ObjectId;
  name: string;
  description: string;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Category = model("Category", CategorySchema);
