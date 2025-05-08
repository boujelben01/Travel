import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.signIn(this.email, this.password).subscribe({
      next: (data) => {
        this.authService.getUserDataByEmail(this.email).subscribe(users => {
          if (users.length > 0) {
            const user = users[0];
            console.log('Utilisateur :', user);
            this.router.navigate([user.role === 'admin' ? '/admin' : '/']);
          } else {
            alert("Utilisateur non trouvé dans db.json");
          }
        });
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert("Email ou mot de passe incorrect");
      }
    });
  }
}
