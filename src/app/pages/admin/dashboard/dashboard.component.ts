import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true
  };
  public pieChartLabels = ['Europe', 'Asia', 'Africa'];
  public pieChartData = [5, 3, 2];
  public pieChartType: ChartType = 'pie';

}
