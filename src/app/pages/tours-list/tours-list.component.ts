import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/core/services/tour.service';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { Tour } from 'src/app/core/models/tour.model';
import { Accommodation } from 'src/app/core/models/accommodation.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.css']
})
export class ToursListComponent implements OnInit {
  allTours: Tour[] = [];
  filteredTours: Tour[] = [];
  accommodations: Accommodation[] = [];
  countries: string[] = [];
  filteredCountries: string[] = [];
  continents: string[] = [];
  uniqueAccommodationTypes: string[] = [];

  filters = {
    continent: '',
    country: '',
    accommodationType: '',
    maxPrice: null
  };

  constructor(
    private tourService: TourService,
    private accommodationService: AccommodationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tourService.getTours().subscribe(tours => {
      this.allTours = tours;
      this.filteredTours = tours;

      this.continents = [...new Set(tours.map(t => t.continent).filter((c): c is string => !!c))];
      this.countries = [...new Set(tours.map(t => t.country))];

      // Initialiser les filtres à partir des queryParams
      this.route.queryParams.subscribe(params => {
        this.filters.continent = params['continent'] || '';
        this.filters.country = params['country'] || '';
        this.filters.accommodationType = params['accommodationType'] || '';
        this.filters.maxPrice = params['maxPrice'] || null;

        this.updateFilteredCountries();
        this.applyFilters();
      });
    });

    // Récupérer tous les hébergements et leurs types
    this.accommodationService.getByCountry('').subscribe(accommodations => {
      this.accommodations = accommodations;
      this.uniqueAccommodationTypes = [...new Set(accommodations.map(a => a.type))];
    });
  }

  onContinentChange(): void {
    this.filters.country = '';
    this.updateFilteredCountries();
    this.applyFilters();
  }

  updateFilteredCountries(): void {
    this.filteredCountries = this.filters.continent
      ? [...new Set(this.allTours.filter(t => t.continent === this.filters.continent).map(t => t.country))]
      : [...new Set(this.allTours.map(t => t.country))];
  }

  applyFilters(): void {
    this.filteredTours = this.allTours.filter(tour =>
      (!this.filters.continent || tour.continent === this.filters.continent) &&
      (!this.filters.country || tour.country === this.filters.country) &&
      (!this.filters.accommodationType || this.getAccommodationType(tour.accommodationId || 0) === this.filters.accommodationType) &&
      (!this.filters.maxPrice || tour.price <= this.filters.maxPrice)
    );
  }

  resetFilters(): void {
    this.filters = {
      continent: '',
      country: '',
      accommodationType: '',
      maxPrice: null
    };
    this.filteredCountries = [...new Set(this.allTours.map(t => t.country))];
    this.filteredTours = this.allTours;
  }

  getAccommodationType(accommodationId: number | string): string {
    const accommodation = this.accommodations.find(a => a.id.toString() === accommodationId.toString());
    return accommodation ? accommodation.type : 'Inconnu';
  }
  
}
