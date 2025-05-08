import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour.model'; 
import { Accommodation } from '../models/accommodation.model';
import { forkJoin as rxjsForkJoin} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TourService {
  private apiUrl = 'http://localhost:3000/tours'; // URL de la ressource tours dans db.json
  private accommodationsUrl = 'http://localhost:3000/accommodations';
  constructor(private http: HttpClient) {}

  // Récupérer tous les tours
  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl);
  }

    // Récupérer un tour avec son hébergement
    getTourWithAccommodation(tourId: number): Observable<{ tour: Tour; accommodation: Accommodation  }> {
      return this.http.get<Tour>(`${this.apiUrl}/${tourId}`).pipe(
        switchMap(tour => {
          if (tour.accommodationId) {
            return this.http.get<Accommodation>(`${this.accommodationsUrl}/${tour.accommodationId}`).pipe(
              map(accommodation => ({ tour, accommodation }))
            );
          } else {
            return of({ tour, accommodation: null as any });
          }
        })
      );
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
function forkJoin(arg0: { tour: Observable<Tour>; accommodation: Observable<Accommodation>; }): Observable<{ tour: Tour; accommodation: Accommodation; }> {
  return rxjsForkJoin(arg0);
}
