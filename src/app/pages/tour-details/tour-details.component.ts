import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { Tour } from 'src/app/core/models/tour.model';
import { Accommodation } from 'src/app/core/models/accommodation.model';
import { AuthService } from 'src/app/core/services/auth.service';

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
    private router: Router,
    private authService: AuthService
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
    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        alert('❌ Vous devez être connecté pour réserver ce tour.');
        this.router.navigate(['/login']);
        return;
      }
  
      const searchContext = JSON.parse(sessionStorage.getItem('searchContext') || '{}');
  
      const reservation = {
        source: 'tour',
        tourId: this.tour.id,
        tour: this.tour,
        accommodation: this.accommodation,
        continent: searchContext.continent || this.tour.continent,
        country: searchContext.country || this.tour.country,
        date1: searchContext.date1 || new Date().toISOString(),
        date2: searchContext.date2 || new Date().toISOString(),
        persons: searchContext.persons || 1
      };
  
      sessionStorage.setItem('tourReservation', JSON.stringify(reservation));
      this.router.navigate(['/reservation-summary']);
    });
  }
  
  
}
