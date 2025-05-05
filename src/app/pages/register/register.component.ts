import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = ''; // Champ pour le nom
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    console.log('Formulaire soumis'); // Vérifiez si ce message s'affiche dans la console
    this.authService.signUp(this.email, this.password, this.name).subscribe({
      next: (user) => {
        console.log('Utilisateur créé :', user);
        this.router.navigate(['/']); // redirige vers page d’accueil
      },
      error: (err) => console.error('Erreur d\'inscription :', err)
    });
  }
  
}