import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { Tour } from 'src/app/core/models/tour.model';
import { Accommodation } from 'src/app/core/models/accommodation.model';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  tour!: Tour;
  accommodation!: Accommodation;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('tourId')!;
    this.tourService.getTourWithAccommodation(id).subscribe({
      next: ({ tour, accommodation }) => {
        this.tour = tour;
        this.accommodation = accommodation;
      },
      error: (err) => console.error('Erreur lors du chargement des détails du tour :', err)
    });
  }
  reserveTour(): void {
    const reservation = {
      source: 'tour',
      tourId: this.tour.id,
      tour: this.tour,
      accommodation: this.accommodation
    };
    sessionStorage.setItem('tourReservation', JSON.stringify(reservation));
    
    this.router.navigate(['/reservation-summary']);
  }
}
