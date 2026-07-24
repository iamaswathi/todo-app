import { TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environment";
import { ToDoService } from "./todo.service";
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ToDo } from "../models/todo.model";


describe('ToDoService', () => {
    let service: ToDoService;
    let httpMock: HttpTestingController;
    const baseUrl = `${environment.apiUrl}/todos`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ToDoService]
        });

        service = TestBed.inject(ToDoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getAll() should send a GET request and get all todos', () => {
       const mockTodos: ToDo[] = [
        {
            id: '1', title: 'Test', isCompleted: false, createdOn: new Date().toISOString()
        }
       ];

       service.getAll().subscribe((todos) => {
            expect(todos).toEqual(mockTodos);
       });

       const req = httpMock.expectOne(baseUrl);
       expect(req.request.method).toBe('GET');
       req.flush(mockTodos);
    });

    it('create() should send a POST request with the title', () => {
       const mockTodo: ToDo = 
        {
            id: '2', title: 'New Task', isCompleted: false, createdOn: new Date().toISOString()
        };

       service.create('New Task').subscribe((todos) => {
            expect(todos).toEqual(mockTodo);
       });

       const req = httpMock.expectOne(baseUrl);
       expect(req.request.method).toBe('POST');
       expect(req.request.body).toEqual({title: 'New Task'});
       req.flush(mockTodo);
    });

    it('delete() should send a DELETE request with the id', () => {
       const id = '1234';

       service.delete(id).subscribe();

       const req = httpMock.expectOne(`${baseUrl}/${id}`);
       expect(req.request.method).toBe('DELETE');
       req.flush(null);
    });


});