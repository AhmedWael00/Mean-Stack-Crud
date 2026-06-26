import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks'; // رابط الباك اند الجديد

  constructor(private http: HttpClient) { }

  // 1. GET: هات كل المهام
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 2. POST: ضيف مهمة جديدة
  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // 3. PUT: عدل مهمة
  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  // 4. DELETE: امسح مهمة
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}