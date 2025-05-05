import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourService } from 'src/app/core/services/tour.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.css']
})
export class EditTourComponent implements OnInit {
  tourForm!: FormGroup;
  selectedImage: string = '';

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private dialogRef: MatDialogRef<EditTourComponent>,
    @Inject(MAT_DIALOG_DATA) public tourData: any
  ) {}

  ngOnInit(): void {
    this.tourForm = this.fb.group({
      title: [this.tourData.title, Validators.required],
      country: [this.tourData.country, Validators.required],
      continent: [this.tourData.continent, Validators.required],
      price: [this.tourData.price, [Validators.required, Validators.min(1)]],
      duration: [this.tourData.duration, [Validators.required, Validators.min(1)]],
      accommodation: [this.tourData.accommodation, Validators.required],
      image: [this.tourData.image],
      description: [this.tourData.description]
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.tourForm.patchValue({ image: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  updateTour(): void {
    if (this.tourForm.valid) {
      const updatedTour = { ...this.tourForm.value, id: this.tourData.id };
      this.tourService.updateTour(updatedTour).subscribe(() => {
        console.log('Tour mis à jour avec succès');
        this.dialogRef.close('refresh');
      });
    }
  }
}
