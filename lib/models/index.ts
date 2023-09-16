import { Todo } from "@/lib/models/todo";
import { Product } from "@/lib/models/product";
import { getModelForClass } from "@typegoose/typegoose";

export const TodoModel = getModelForClass(Todo);
export const ProductModel = getModelForClass(Product);
