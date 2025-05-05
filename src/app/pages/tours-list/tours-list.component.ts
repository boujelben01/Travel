import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { Tour } from 'src/app/core/models/tour.model';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.css']
})
export class ToursListComponent implements OnInit {
  allTours: Tour[] = [];
  filteredTours: Tour[] = [];
  countries: string[] = [];
  accommodations: string[] = ['Hotel', 'Maison', 'Auberge', 'Camping'];

  filters = {
    country: '',
    accommodation: '',
    maxPrice: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.tourService.getTours().subscribe(tours => {
      this.allTours = tours;
      this.filteredTours = tours;
      this.countries = [...new Set(tours.map(t => t.country))];
    });
  }

  applyFilters(): void {
    this.filteredTours = this.allTours.filter(tour =>
      (!this.filters.country || tour.country === this.filters.country) &&
      (!this.filters.accommodation || tour.accommodation === this.filters.accommodation) &&
      (!this.filters.maxPrice || tour.price <= this.filters.maxPrice)
    );
  }

  resetFilters(): void {
    this.filters = { country: '', accommodation: '', maxPrice: null };
    this.filteredTours = this.allTours;
  }

  goToDetails(tourId: number): void {
    this.router.navigate(['/tour-details', tourId]);
  }
}
