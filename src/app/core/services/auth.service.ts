import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private dbUrl = 'http://localhost:3000/users';
  private loggedInEmail$ = new BehaviorSubject<string | null>(null);
  private currentUser$ = new BehaviorSubject<any>(null);
  
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.afAuth.authState.subscribe(user => {
      const email = user?.email || null;
      this.loggedInEmail$.next(email);
    
      if (email) {
        this.getUserDataByEmail(email).subscribe(users => {
          if (users.length > 0) {
            this.currentUser$.next(users[0]); // 🔥 auto-actualisation ici
          }
        });
      } else {
        this.currentUser$.next(null); // déconnexion ou non connecté
      }
    });
    
  }

  signUp(email: string, password: string, name: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential) => {
        const newUser: User = {
          uid: userCredential.user?.uid,
          email,
          name,
          role: 'user'
        };
        return this.http.post(this.dbUrl, newUser);
      })
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((userCredential) => ({
        email: userCredential.user?.email,
        role: 'user'
      }))
    );
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  getLoggedInEmail(): Observable<string | null> {
    return this.loggedInEmail$.asObservable();
  }

  getUserDataByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.dbUrl}?email=${email}`);
  }

  updateUser(id: string, updatedUser: Partial<User>): Observable<any> {
    return this.http.patch(`${this.dbUrl}/${id}`, updatedUser);
  }
  updateLoggedInUser(user: User): void {
    this.currentUser$.next(user);
  }
  
  getLoggedInUserObservable(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }
  
}
