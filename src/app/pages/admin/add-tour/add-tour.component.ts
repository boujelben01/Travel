import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TourService } from 'src/app/core/services/tour.service';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { Accommodation } from 'src/app/core/models/accommodation.model';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {
  tourForm: FormGroup;
  accommodations: Accommodation[] = [];

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private accommodationService: AccommodationService,
    private dialogRef: MatDialogRef<AddTourComponent>
  ) {
    this.tourForm = this.fb.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      accommodationId: [null, Validators.required], // Lien via l'ID
      image: ['assets/images/default.jpg'],
      duration: [1, [Validators.required, Validators.min(1)]],
      continent: ['Europe', Validators.required]
    });
  }

  ngOnInit(): void {
    this.accommodationService.getByCountry(this.tourForm.value.country).subscribe({
      next: (data) => (this.accommodations = data),
      error: (err) => console.error('Erreur lors du chargement des hébergements :', err)
    });
  }

  addTour(): void {
    if (this.tourForm.valid) {
      this.tourService.addTour(this.tourForm.value).subscribe({
        next: () => {
          console.log('Tour ajouté avec succès');
          this.dialogRef.close('refresh');
        },
        error: (err) => console.error('Erreur lors de l\'ajout du tour :', err)
      });
    }
  }
}