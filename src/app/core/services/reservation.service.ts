import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { Tour } from '../models/tour.model';
import { Accommodation } from '../models/accommodation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) {}

  saveReservation(reservation: Reservation): Observable<any> {
    return this.http.post(this.apiUrl, reservation);
  }
  getTourWithAccommodation(id: number): Observable<{ tour: Tour, accommodation: Accommodation }> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`).pipe(
      switchMap(tour => {
        return this.http.get<Accommodation>(`http://localhost:3000/accommodations/${tour.accommodationId}`).pipe(
          map(accommodation => ({ tour, accommodation }))
        );
      })
    );
  }
  
}
