import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {Todo} from '../todo.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  initialState = [
    {id: uuid(), title: 'buy a milk', isCompleted: false},
    {id: uuid(), title: 'buy a milk2', isCompleted: false},
    {id: uuid(), title: 'buy a milk3', isCompleted: true}
  ];
  private readonly todosub = new BehaviorSubject<Todo[]>(this.initialState);

  readonly todos$ = this.todosub.asObservable();


  readonly completedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => todo.isCompleted))
  );
  readonly uncompletedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.isCompleted))
  );

  private get todos(): Todo[] {
    console.log(this.todosub.getValue());
    return this.todosub.getValue();
  }


  private set todos(val: Todo[]) {
    this.todosub.next(val);
  }

  addTodo(title: string) {
    this.todos = [
      ...this.todos,
      {id: uuid(), title, isCompleted: false}
    ];
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  setCompleted(id: string, isCompleted: boolean) {
    const todo = this.todos.find(el => el.id === id);

    if (todo) {
      const index = this.todos.indexOf(todo);
      this.todos[index] = {
        ...todo,
        isCompleted
      };
      this.todos = [...this.todos];
    }
  }

  editToDo(id: string, title: string) {
    const todo = this.todos.find(el => el.id === id);

    if (todo) {
      const index = this.todos.indexOf(todo);
      this.todos[index] = {
        ...todo,
        title
      };
      this.todos = [...this.todos];
    }
  }

  constructor() {
  }
}
