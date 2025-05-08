import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { ContinentService } from 'src/app/core/services/continent.service';
import { Accommodation } from 'src/app/core/models/accommodation.model';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  formData: any = {
    continent: '',
    country: '',
    date1: '',
    date2: '',
    persons: 1
  };

  minDate: Date = new Date();
  continents: any[] = [];
  countries: string[] = [];
  accommodations: Accommodation[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private continentService: ContinentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.continentService.getContinents().subscribe({
      next: (data) => {
        this.continents = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des continents :', err);
      }
    });
  }

  onContinentChange(continentName: string): void {
    const continent = this.continents.find(c => c.name === continentName);
    this.countries = continent ? continent.countries : [];
    this.accommodations = [];
  }

  onCountryChange(country: string): void {
    if (country) {
      this.accommodationService.getByCountry(country).subscribe({
        next: (data) => {
          this.accommodations = data;
          this.filterAvailability();
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des hébergements :', err);
        }
      });
    } else {
      this.accommodations = [];
    }
  }

  filterAvailability(): void {
    if (!this.formData.date1 || !this.formData.date2) return;

    const d1 = new Date(this.formData.date1);
    const d2 = new Date(this.formData.date2);

    this.accommodations = this.accommodations.filter(acc => {
      const from = new Date(acc.availableFrom || '');
      const to = new Date(acc.availableTo || '');
      return d1 >= from && d2 <= to;
    });
  }

  reserveAccommodation(acc: Accommodation): void {
    const reservation = {
      source: 'planner',
      continent: this.formData.continent,
      country: this.formData.country,
      date1: this.formData.date1,
      date2: this.formData.date2,
      persons: this.formData.persons,
      accommodation: acc
    };
    sessionStorage.setItem('plannerReservation', JSON.stringify(reservation));
    this.router.navigate(['/reservation-summary']);
  }
}