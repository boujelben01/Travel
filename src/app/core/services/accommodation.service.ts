import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accommodation } from '../models/accommodation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private apiUrl = 'http://localhost:3000/accommodations';

  constructor(private http: HttpClient) {}

  getByCountry(country: string): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.apiUrl}?country=${country}`);
  }

  getAll(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.apiUrl);
  }
  
}
