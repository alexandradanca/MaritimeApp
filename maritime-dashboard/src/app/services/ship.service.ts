import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ship } from '../models/ship.model';

@Injectable({ providedIn: 'root' })
export class ShipService {
  private apiUrl = '/api/ships';

  constructor(private http: HttpClient) {}

  getShips(): Observable<Ship[]> {
    return this.http.get<Ship[]>(this.apiUrl);
  }

  createShip(ship: Partial<Ship>): Observable<Ship> {
    return this.http.post<Ship>(this.apiUrl, ship);
  }

  updateShip(id: number, ship: Ship): Observable<Ship> {
    return this.http.put<Ship>(`${this.apiUrl}/${id}`, ship);
  }

  deleteShip(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
