import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { ToDo } from '../../../models/todo.model';
import { ToDoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, AddTodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todos = signal<ToDo[]>([]); 
  isLoading = signal(true);
  isSubmitting = signal(false);
  isDeleting = signal<string | null>(null);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private toDoService: ToDoService) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadTodos();
  }

  /**
   * Loads the list of todos
   */
  loadTodos(): void {
    this.isLoading.set(true);
    this.toDoService.getAll().subscribe({
      next: (todos) => {
        console.log('Fetched todos list ', todos);
        this.todos.set(todos);
        this.isLoading.set(false);
      },
      error: () => {
        console.log('Error occured');
        this.errorMessage.set('Failed to load ToDo list.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Called when user try to add a new todo item.
   * the existing todo list gets updated once the new item is added succefully, else throws an error
   * @param title 
   */
  onAdd(title: string): void {
    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.toDoService.create(title).subscribe({
      next: () => {
        this.successMessage.set('New ToDo added successfully');
        this.isSubmitting.set(false);
        this.loadTodos();
        this.clearMessageAfterDelay();
      },
      error: () => {
        this.errorMessage.set('Failed to add ToDo.');
        this.isSubmitting.set(false);
      }
    });
  }

  /**
   * 
   * @param id Called when the user deletes any todo item
   */
  onDelete(id: string): void {
    this.isDeleting.set(id);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.toDoService.delete(id).subscribe({
      next: () => {
        this.successMessage.set('ToDo deleted successfully.');
        this.isDeleting.set(null);
        this.loadTodos();
        this.clearMessageAfterDelay();
      },
      error: () => {
        this.errorMessage.set('Failed to delete ToDo.');
        this.isDeleting.set(null);
      }
    });
  }

  /**
   * Removes the message display after 3 seconds
   */
  private clearMessageAfterDelay (): void {
    setTimeout(() => (this.successMessage.set('')), 3000);
  }

}
