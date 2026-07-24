import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit trimmed title on submit', () => {
    vi.spyOn(component.add, 'emit');
    component.title = '  Buy Groceries.  ';
    component.submit();

    expect(component.add.emit).toHaveBeenLastCalledWith('Buy Groceries.');
    expect(component.title).toBe('');
  });

  it('should not call submit when title is empty or whitespace', () => {
    vi.spyOn(component.add, 'emit');
    component.title = '  ';
    component.submit();

    expect(component.add.emit).not.toHaveBeenCalled();
  });

  it('should not emit when isSubmitting is true', () => {
    vi.spyOn(component.add, 'emit');
    component.title = 'Valid Title';
    component.isSubmitting = true;
    component.submit();

    expect(component.add.emit).not.toHaveBeenCalled();
  });
});

