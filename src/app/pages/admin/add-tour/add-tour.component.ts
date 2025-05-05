import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent {
  tourForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private router: Router
  ) {
    this.tourForm = this.fb.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      accommodation: ['Hotel', Validators.required],
      image: ['assets/images/default.jpg'],
      duration: [1, [Validators.required, Validators.min(1)]],
      continent: ['Europe', Validators.required]
    });
  }

  addTour(): void {
    if (this.tourForm.valid) {
      this.tourService.addTour(this.tourForm.value).subscribe({
        next: () => {
          console.log('Tour ajouté avec succès');
          this.router.navigate(['/admin/tours']); // Redirige vers la liste des tours
        },
        error: (err) => console.error('Erreur lors de l\'ajout du tour :', err)
      });
    }
  }
}