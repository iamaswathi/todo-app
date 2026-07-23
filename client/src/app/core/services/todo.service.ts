
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"
import { Observable } from "rxjs";
import { ToDo } from "../models/todo.model";
import { Injectable } from "@angular/core";

@Injectable ({providedIn: 'root'})
export class ToDoService {


    private readonly baseUrl = `${environment.apiUrl}/todos`;

    constructor(private httpClient: HttpClient) {}

    // to get the list of ToDo items
    getAll(): Observable<ToDo[]> {
        return this.httpClient.get<ToDo[]>(this.baseUrl);
    }

    // to create new ToDo item
    create(title: string): Observable<ToDo> {
         return this.httpClient.post<ToDo>(this.baseUrl, {title});
    }

    // to delete an existing ToDo item using the id
    delete(id: string): Observable<void> {
         return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
    
}