import { Component, signal } from '@angular/core';
import { TodoListComponent } from './core/features/todo-list/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Client';
}
