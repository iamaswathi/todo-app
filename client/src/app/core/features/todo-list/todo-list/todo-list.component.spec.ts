import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { ToDo } from '../../../models/todo.model';
import { ToDoService } from '../../../services/todo.service';
import { of, throwError } from 'rxjs';
import { describe, vi, Mock } from 'vitest';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  // let todoServiceSpy: jasmine.SpyObj<ToDoService>;
  let toDoServiceMock: {
    getAll: Mock,
    create: Mock,
    delete: Mock
  };
  const mockTodos: ToDo[] = [
          {
              id: '1', title: 'Switch to Telstra', isCompleted: false, createdOn: new Date().toISOString()
          }, {
              id: '2', title: 'Get medicines', isCompleted: false, createdOn: new Date().toISOString()
          }
         ];

  beforeEach(async () => {
    // const spy = jasmine.createSpyObj('ToDoService', ['getAll', 'create', 'delete']);
    toDoServiceMock = {
      getAll: vi.fn(),
      create: vi.fn(),
      delete: vi.fn()
    };
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [{provide: ToDoService, useValue: toDoServiceMock}]
    }).compileComponents();

    toDoServiceMock.getAll.mockReturnValue(of(mockTodos));
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load todos list on init', () => {
    fixture.detectChanges();
    expect(toDoServiceMock.getAll).toHaveBeenCalled();
    expect(component.todos()).toEqual(mockTodos);
    expect(component.isLoading()).toBe(false);
  });

  it('should set error message when loading todos fail', () => {
    toDoServiceMock.getAll.mockReturnValue(throwError(() => new Error('fail')));
    fixture.detectChanges();
    expect(toDoServiceMock.getAll).toHaveBeenCalled();
    expect(component.errorMessage()).toBe('Failed to load ToDo list.');
    expect(component.isLoading()).toBe(false);
  });

  it('should set error message when add todo item fail', () => {
    fixture.detectChanges();
    toDoServiceMock.create.mockReturnValue(throwError(() => new Error('fail')));
    component.onAdd('Third');
    expect(component.errorMessage()).toBe('Failed to add ToDo.');
    expect(component.isSubmitting()).toBe(false);
  });

  it('should add a todo and reload the todos list', () => {
    fixture.detectChanges();
    const newTodo = {
              id: '3', title: 'Third', isCompleted: false, createdOn: new Date().toISOString()
          };
    toDoServiceMock.create.mockReturnValue(of(newTodo));
    toDoServiceMock.getAll.mockReturnValue(of([...mockTodos, newTodo]));

    component.onAdd('Third');

    expect(toDoServiceMock.create).toHaveBeenCalledWith('Third');

    expect(component.successMessage()).toBe('New ToDo added successfully');
    expect(component.isSubmitting()).toBe(false);
    expect(component.todos().length).toBe(3);
  });

  it('should delete a todo and reload the todos list', () => {
    fixture.detectChanges();
    toDoServiceMock.delete.mockReturnValue(of(undefined));
    toDoServiceMock.getAll.mockReturnValue(of([mockTodos[1]]));

    component.onDelete('1');

    expect(toDoServiceMock.delete).toHaveBeenCalledWith('1');

    expect(component.successMessage()).toBe('ToDo deleted successfully.');
    expect(component.isDeleting()).toBe(null);
    expect(component.todos().length).toBe(1);
  });

  it('should set error message when delete fails', () => {
    fixture.detectChanges();
    toDoServiceMock.delete.mockReturnValue(throwError(() => new Error('fail')));

    component.onDelete('1');

    expect(component.errorMessage()).toBe('Failed to delete ToDo.');
    expect(component.isDeleting()).toBe(null);
  });

  it('should render todo items in DOM', () => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('app-todo-item'));
    expect(items.length).toBe(2);
  });

  it('should show empty when there are no todos', () => {
    toDoServiceMock.getAll.mockReturnValue(of([]));
    fixture.detectChanges();
    const emptyToDoMessage = fixture.debugElement.query(By.css('p:last-child'));
    expect(emptyToDoMessage.nativeElement.textContent).toContain('No Todos yet, add one above.');
  });

  
});
