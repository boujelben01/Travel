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
    this.authService.getLoggedInUserObservable().subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUserEmail = user.email;
        this.currentUserName = user.name;
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
