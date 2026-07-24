import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  title = "";
  @Input() isSubmitting = false;
  @Output() add = new EventEmitter<string>();

  /**
   * Function to send a trimmed title
   * @returns 
   */
  submit(): void {
    const trimmedTitle = this.title.trim();
    if(!trimmedTitle || this.isSubmitting) return;
    this.add.emit(trimmedTitle);
    this.title = "";
  }
}
