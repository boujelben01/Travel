import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourService } from 'src/app/core/services/tour.service';
import { Tour } from 'src/app/core/models/tour.model';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.css']
})
export class EditTourComponent implements OnInit {
  tourForm: FormGroup;
  tourId!: number;

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.tourId = +this.route.snapshot.paramMap.get('id')!;
    this.tourService.getTours().subscribe((tours) => {
      const tour = tours.find((t) => t.id === this.tourId);
      if (tour) {
        this.tourForm.patchValue(tour);
      }
    });
  }

  updateTour(): void {
    if (this.tourForm.valid) {
      const updatedTour: Tour = { id: this.tourId, ...this.tourForm.value };
      this.tourService.updateTour(updatedTour).subscribe({
        next: () => {
          console.log('Tour modifié avec succès');
          this.router.navigate(['/admin/tours']); // Redirige vers la liste des tours
        },
        error: (err) => console.error('Erreur lors de la modification du tour :', err)
      });
    }
  }
}