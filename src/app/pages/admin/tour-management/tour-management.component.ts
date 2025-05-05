import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TourService } from 'src/app/core/services/tour.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTourComponent } from 'src/app/pages/admin/add-tour/add-tour.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditTourComponent } from 'src/app/pages/admin/edit-tour/edit-tour.component'; // importe bien le composant
@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.css']
})
export class TourManagementComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columns: string[] = ['id', 'title', 'country', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tourService: TourService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTours();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadTours(): void {
    this.tourService.getTours().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Tours chargés :', data);
      },
      error: (err) => console.error('Erreur lors du chargement des tours :', err)
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTourComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadTours();
      }
    });
  }

  editTour(tour: any): void {
    const dialogRef = this.dialog.open(EditTourComponent, {
      width: '600px',
      data: tour // on passe les données du tour à modifier
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadTours(); // recharge les données après édition
      }
    });
  }

  deleteTour(id: number): void {
    this.tourService.deleteTour(id).subscribe({
      next: () => {
        console.log('Tour supprimé avec succès');
        this.loadTours();
      },
      error: (err) => console.error('Erreur lors de la suppression du tour :', err)
    });
  }
}
