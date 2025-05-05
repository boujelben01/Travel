import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { Tour } from 'src/app/core/models/tour.model';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {
  tour!: Tour | undefined;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('tourId'));
    this.tourService.getTours().subscribe(tours => {
      this.tour = tours.find(t => t.id === id);
    });
  }
}
