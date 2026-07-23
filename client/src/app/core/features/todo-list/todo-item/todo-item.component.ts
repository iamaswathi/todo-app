import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../../models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input({required: true}) todo!: ToDo;
  @Input() isDeleting = false;
  @Output() delete = new EventEmitter<string>();
}