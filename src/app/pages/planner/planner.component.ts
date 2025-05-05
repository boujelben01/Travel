import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
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
  continents = [
    { name: 'Europe', countries: ['France', 'Italie', 'Espagne'] },
    { name: 'Asie', countries: ['Japon', 'Thaïlande', 'Vietnam'] },
    { name: 'Afrique', countries: ['Maroc', 'Kenya', 'Afrique du Sud'] },
    { name: 'Amérique', countries: ['USA', 'Brésil', 'Canada'] },
    { name: 'Océanie', countries: ['Australie', 'Nouvelle-Zélande'] }
  ];

  countries: string[] = [];
  accommodations: Accommodation[] = [];

  constructor(
    private accommodationService: AccommodationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onContinentChange(continentName: string): void {
    const continent = this.continents.find(c => c.name === continentName);
    this.countries = continent ? continent.countries : [];
    this.accommodations = []; // Réinitialiser les hébergements
  }

  onCountryChange(country: string): void {
    if (country && this.formData.date1 && this.formData.date2) {
      this.filterAccommodations(country);
    } else {
      this.accommodations = []; // Réinitialiser si les critères ne sont pas remplis
    }
  }

  filterAccommodations(country: string): void {
    const d1 = new Date(this.formData.date1);
    const d2 = new Date(this.formData.date2);

    if (d1 > d2) {
      console.error('La date de début doit être antérieure à la date de fin.');
      return;
    }

    this.accommodationService.getByCountry(country).subscribe({
      next: (data) => {
        this.accommodations = data.filter(acc => {
          const from = new Date(acc.availableFrom || '');
          const to = new Date(acc.availableTo || '');
          return d1 >= from && d2 <= to;
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des hébergements :', err);
      }
    });
  }

  // submitPlan(): void {
  //   if (!this.formData.date1 || !this.formData.date2 || !this.formData.country) {
  //     console.error('Veuillez remplir tous les champs obligatoires.');
  //     return;
  //   }

  //   sessionStorage.setItem('reservation', JSON.stringify(this.formData));
  //   this.router.navigate(['/reservation-summary']);
  // }

  /** Nouvelle méthode pour réserver un hébergement */
  reserveAccommodation(acc: Accommodation): void {
    // Compose l'objet de réservation complet
    const reservation = {
      ...this.formData,
      accommodation: acc
    };

    // Stocke la réservation dans sessionStorage
    sessionStorage.setItem('reservation', JSON.stringify(reservation));

    // Redirige vers la page de résumé
    this.router.navigate(['/reservation-summary']);
  }
}
  
