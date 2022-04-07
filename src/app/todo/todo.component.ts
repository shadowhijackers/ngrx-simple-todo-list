import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Todo} from "../models/todo";
import {Store} from "@ngrx/store";
import {selectTodos} from "../state/todos.selectors";
import {Observable, of, Subject} from "rxjs";
import {addTodo, initTodos, removeTodo, updateTodo} from "../state/todos.actions";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  searchStr = new FormControl()
  todos: Todo[] = [];
  todos$: Observable<Todo[]> = of([]);
  filteredTodos: Todo[] = []
  todoCategory = 'all';
  unsubscribe$ = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.todos$ = this.store.select(selectTodos);
    this.store.dispatch(initTodos());
    this.todos$.pipe(takeUntil(this.unsubscribe$)).subscribe((todos)=>{
      this.todos = JSON.parse(JSON.stringify(todos));
      this.filterTodos();
      this.storeTodos();
    });
  }

  addTodo() {
    if (this.searchStr.invalid) return
    this.store.dispatch(addTodo({
      id: String(Math. floor(Math.random()*100000000+new Date().getTime())),
      title: this.searchStr.value,
      isCompleted: false,
      createdAt: String(new Date().getTime())
    }))
    this.filterTodos();
     this.storeTodos();
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(removeTodo(todo))
  }

  updateCategory(category: string){
    this.todoCategory = category;
    this.filterTodos();
  }

  filterTodos() {
    switch (this.todoCategory) {
      case 'all':
        this.filteredTodos = this.todos;
        break
      case 'active':
        this.filteredTodos = this.todos.filter(t=>!t.isCompleted);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(t=>t.isCompleted);
        break
    }
  }

  todoTrackBy(idx: number, todo: Todo){
    return todo.id
  }

  updateTodo(todo: Todo){
    this.store.dispatch(updateTodo(todo))
  }

  storeTodos(){
    localStorage.setItem('todos', JSON.stringify(this.todos) ?? [])
  }

}
