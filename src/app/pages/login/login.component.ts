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
        console.log('Connecté avec succès !', data);

        // Récupérer les infos de db.json (nom, rôle, etc.)
        this.authService.getUserDataByEmail(this.email).subscribe((users) => {
          if (users.length > 0) {
            const user = users[0];
            console.log('Nom de l\'utilisateur :', user.name);

            // Redirection selon le rôle
            if (user.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          } else {
            console.warn('Utilisateur non trouvé dans db.json');
          }
        });
      },
      error: (err) => console.error('Erreur de connexion', err)
    });
  }
}
