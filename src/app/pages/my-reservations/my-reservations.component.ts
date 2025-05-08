import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user?.email) {
        this.reservationService.getReservations().subscribe(data => {
          this.reservations = data
  .filter(r => r.userEmail === user.email)
  .sort((a, b) => new Date(b.date1).getTime() - new Date(a.date1).getTime());

        });
      }
    });
  }}
