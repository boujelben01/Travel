import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/core/models/reservation.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  reservation: Reservation | null = null;

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const tourReservation = sessionStorage.getItem('tourReservation');
    const plannerReservation = sessionStorage.getItem('plannerReservation');
  
    if (tourReservation) {
      this.reservation = JSON.parse(tourReservation);
    } else if (plannerReservation) {
      this.reservation = JSON.parse(plannerReservation);
    }
  }
  
  confirm(): void {
    if (this.reservation) {
      this.authService.getCurrentUser().subscribe(user => {
        if (user?.email) {
          if (this.reservation) {
            this.reservation.userEmail = user.email; // Associer l'email de l'utilisateur
          }
          this.reservationService.saveReservation(this.reservation!).subscribe({
            next: () => {
              console.log('Réservation enregistrée avec userEmail');
              this.router.navigate(['/confirmation']);
            },
            error: (err) => console.error('Erreur enregistrement réservation', err)
          });
        }
      });
    }
  }
  
  }