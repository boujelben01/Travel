import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour.model'; 


@Injectable({
  providedIn: 'root'
})
export class TourService {
  private apiUrl = 'http://localhost:3000/tours'; // URL de la ressource tours dans db.json

  constructor(private http: HttpClient) {}

  // Récupérer tous les tours
  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl);
  }

  // Ajouter un tour
  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.apiUrl, tour);
  }

  // Modifier un tour
  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.apiUrl}/${tour.id}`, tour);
  }

  // Supprimer un tour
  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getTourById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  
  
}