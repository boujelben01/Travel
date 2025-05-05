import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.css']
})
export class TourManagementComponent implements OnInit {
  tours: any[] = []; // Liste des tours
  columns: string[] = ['id', 'title', 'country', 'price', 'actions']; // Colonnes du tableau
  constructor(private tourService: TourService, private router: Router) {}
  

  ngOnInit(): void {
    this.loadTours(); // Charger les tours au démarrage
  }

  // Charger les tours depuis db.json
  loadTours(): void {
    this.tourService.getTours().subscribe({
      next: (data) => {
        this.tours = data;
        console.log('Tours chargés :', this.tours);
      },
      error: (err) => console.error('Erreur lors du chargement des tours :', err)
    });
  }

  // Ajouter un tour (ouvrir un dialogue ou autre logique)
  openAddDialog(): void {
    this.router.navigate(['/admin/add-tour/new']);
  }

  // Modifier un tour
  editTour(tour: any): void {
    this.router.navigate(['/admin/edit-tour', tour.id]);
  }

  // Supprimer un tour
  deleteTour(id: number): void {
    this.tourService.deleteTour(id).subscribe({
      next: () => {
        console.log('Tour supprimé avec succès');
        this.loadTours(); // Recharger les tours après suppression
      },
      error: (err) => console.error('Erreur lors de la suppression du tour :', err)
    });
  }
}