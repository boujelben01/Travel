import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContinentService } from 'src/app/core/services/continent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  minDate: Date = new Date();

  formData = {
    continent: '',
    country: '',
    date1: '',
    date2: '',
    persons: 1
  };

  continents: any[] = [];
  countries: string[] = [];

  constructor(private router: Router, private continentService: ContinentService) {}

  ngOnInit(): void {
    this.continentService.getContinents().subscribe((data) => {
      this.continents = data;
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

    this.router.navigate(['/tours'], {
      queryParams: this.formData
    });
  }
}
