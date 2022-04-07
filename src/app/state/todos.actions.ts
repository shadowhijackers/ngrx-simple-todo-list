import {createAction, props} from "@ngrx/store";
import {Todo} from "../models/todo";

export const initTodos = createAction('[Todos] Init');
export const addTodo = createAction('[Todos] Add', props<Todo>());
export const updateTodo = createAction('[Todos] Update', props<Todo>());
export const removeTodo = createAction('[Todos] Remove', props<Todo>());
