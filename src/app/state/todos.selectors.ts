import {createFeatureSelector} from "@ngrx/store";
import {Todo} from "../models/todo";

export const selectTodos = createFeatureSelector<Array<Todo>>('todos');
