
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/core/models/reservation.model';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  reservation: Reservation | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = sessionStorage.getItem('reservation');
    if (stored) {
      this.reservation = JSON.parse(stored);
    }
  }

  confirm(): void {
    // Simule confirmation, redirige
    this.router.navigate(['/confirmation']);
  }
}
