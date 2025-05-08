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
    this.authService.signUp(this.email, this.password, this.name).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Erreur d\'inscription :', err)
    });
  }
  
}