import {Todo} from "../models/todo";
import {createReducer, on} from "@ngrx/store";
import {addTodo, initTodos, removeTodo, updateTodo} from "./todos.actions";

export const initialState: Array<Todo> = [];
export const todosReducer = createReducer(
  initialState,
  on(initTodos, (state, action) => {
    return (JSON.parse(localStorage.getItem('todos') as string) ?? []) as Todo[];
  }),
  on(addTodo, (state, action) => ([...state, action])),
  on(updateTodo, (state, action) => {
    const clonedTodos =  JSON.parse(JSON.stringify(state));
    let todoIdx = clonedTodos.findIndex((v: any)=>action.id == v.id);
    if (todoIdx > -1) clonedTodos[todoIdx] = action;
    return [...clonedTodos];
  }),
  on(removeTodo, (state, action) => {
    return state.filter((t)=>action.id != t.id)
  })
)
