import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContinentService } from 'src/app/core/services/continent.service';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  minDate: Date = new Date();
  formData = { continent: '', country: '', date1: '', date2: '', persons: 1 };
  continents: any[] = [];
  countries: string[] = [];

  randomTours: any[] = [];

  constructor(
    private router: Router,
    private continentService: ContinentService,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.continentService.getContinents().subscribe(data => {
      this.continents = data;
    });

    this.tourService.getTours().subscribe(tours => {
      this.randomTours = this.shuffleArray(tours).slice(0, 4);
    });
  }

  onContinentChange(continent: string): void {
    const selected = this.continents.find(c => c.name === continent);
    this.countries = selected ? selected.countries : [];
    this.formData.country = '';
  }

  searchTours(): void {
    const { date1, date2 } = this.formData;
    if (new Date(date2) <= new Date(date1)) {
      alert("❗ La date de retour doit être postérieure à la date d'aller.");
      return;
    }
    //sessionStorage.setItem('plannerReservation', JSON.stringify(this.formData));
    this.router.navigate(['/tours'], { queryParams: this.formData });
  }

  private shuffleArray(array: any[]): any[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
}
