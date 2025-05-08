import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Port } from '../models/port.model';

@Injectable({ providedIn: 'root' })
export class PortService {
  private apiUrl = '/api/ports';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Port[]> {
    return this.http.get<Port[]>(this.apiUrl);
  }
}
