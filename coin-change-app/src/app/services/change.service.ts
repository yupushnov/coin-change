import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Change, ChangeRequest } from '../models/change.model';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'https://lwgg9436pf.execute-api.us-east-1.amazonaws.com/dev/';

  getAvailableChange(): Observable<Array<Change>> {
    return this.http.get<Array<Change>>(`${this.baseUrl}availableChange`);
  }

  postChange(request: ChangeRequest): Observable<Array<Change>> {
    return this.http.post<Array<Change>>(`${this.baseUrl}change`, request);
  }

  postOptimalChange(request: ChangeRequest): Observable<Array<Change>> {
    return this.http.post<Array<Change>>(`${this.baseUrl}optimalChange`, request);
  }
}
