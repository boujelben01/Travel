import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContinentService {
  private apiUrl = 'http://localhost:3000/continents';

  constructor(private http: HttpClient) {}

  getContinents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
