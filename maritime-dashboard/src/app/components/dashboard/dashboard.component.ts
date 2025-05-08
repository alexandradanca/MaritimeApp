import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    NgChartsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  totalShips: number = 0;
  totalPorts: number = 0;
  totalVoyages: number = 0;

  overviewChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        data: [30, 20, 40, 25],
        label: 'Traffic',
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgba(0,180,216,0.3)',
        borderColor: '#00b4d8'
      }
    ]
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/ships').subscribe(data => this.totalShips = data.length);
    this.http.get<any[]>('/api/ports').subscribe(data => this.totalPorts = data.length);
    this.http.get<any[]>('/api/voyages').subscribe(data => this.totalVoyages = data.length);
  }
}
