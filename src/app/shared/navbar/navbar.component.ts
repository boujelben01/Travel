import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  currentUserEmail: string | null = null;
  currentUserName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user?.email) {
        this.isLoggedIn = true;
        this.currentUserEmail = user.email;

        this.authService.getUserDataByEmail(user.email).subscribe(users => {
          if (users.length > 0) {
            this.currentUserName = users[0].name;
          }
        });
      } else {
        this.isLoggedIn = false;
        this.currentUserEmail = null;
        this.currentUserName = null;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.currentUserEmail = null;
      this.currentUserName = null;
      this.router.navigate(['/']);
    });
  }
}
