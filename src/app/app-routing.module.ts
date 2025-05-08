import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToursListComponent } from './pages/tours-list/tours-list.component';
import { TourDetailsComponent } from './pages/tour-details/tour-details.component';
import { PlannerComponent } from './pages/planner/planner.component';
import { ReservationSummaryComponent } from './pages/reservation-summary/reservation-summary.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MyReservationsComponent } from './pages/my-reservations/my-reservations.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tours', component: ToursListComponent },
  { path: 'tour-details/:tourId', component: TourDetailsComponent },
  { path: 'planner/:tourId', component: PlannerComponent },
  { path: 'reservation-summary', component: ReservationSummaryComponent },
  { path: 'confirmation', component: ConfirmationComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'profile', component: EditProfileComponent , canActivate: [AuthGuard] },
  { path: 'my-reservations', component: MyReservationsComponent, canActivate: [AuthGuard]  },

  
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
