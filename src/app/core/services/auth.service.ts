import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private dbUrl = 'http://localhost:3000/users'; // URL de db.json

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  // Inscription via Firebase
  signUp(email: string, password: string, name: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential) => {
        // Ajouter le nom dans db.json
        const newUser = {
          email: email,
          name: name
        };
        return this.http.post(this.dbUrl, newUser); // Enregistrer le nom dans db.json
      })
    );
  }

  // Connexion
  signIn(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.dbUrl}?email=${email}`).pipe(
      switchMap((users) => {
        if (users.length > 0 && users[0].password === password) {
          // Si c'est un administrateur
          return of({ email, role: 'admin' });
        } else {
          // Sinon, utiliser Firebase pour la connexion
          return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
            map((userCredential) => ({
              email: userCredential.user?.email,
              role: 'user'
            }))
          );
        }
      })
    );
  }

  // Déconnexion
  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }
  // Vérifier si l'utilisateur est connecté
getUserDataByEmail(email: string): Observable<any> {
  return this.http.get<any[]>(`http://localhost:3000/users?email=${email}`);
}

  
}