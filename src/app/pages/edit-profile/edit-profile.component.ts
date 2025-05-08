import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  userId: string = '';
  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.authService.getLoggedInEmail().subscribe(email => {
      if (email) {
        this.authService.getUserDataByEmail(email).subscribe(users => {
          if (users.length > 0) {
            const user = users[0];
            this.userId = user.id || '';
            this.name = user.name;
            this.email = user.email;
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.userId) {
      alert("ID utilisateur introuvable !");
      return;
    }

    const updated: Partial<User> = {
      name: this.name
    };

    this.authService.updateUser(this.userId, updated).subscribe({
      next: () => {
        alert('Profil mis à jour !');
        // Mettre à jour l'utilisateur connecté
        this.authService.getUserDataByEmail(this.email).subscribe(users => {
          if (users.length > 0) {
            this.authService.updateLoggedInUser(users[0]);
          }
        });
      },
      error: () => alert('Erreur mise à jour.')
    });
  }
}
