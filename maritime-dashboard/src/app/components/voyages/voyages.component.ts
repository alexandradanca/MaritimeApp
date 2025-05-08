import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgChartsModule } from 'ng2-charts';

interface Voyage {
  id: number;
  ship: string;
  departurePort: string;
  arrivalPort: string;
  date: string;
}

@Component({
  selector: 'app-voyages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NgChartsModule
  ],
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.css']
})
export class VoyagesComponent implements OnInit {
  voyages: Voyage[] = [
    { id: 1, ship: 'Aurora', departurePort: 'Constanta', arrivalPort: 'Marseille', date: '2025-05-01' },
    { id: 2, ship: 'Endeavour', departurePort: 'Genoa', arrivalPort: 'Naples', date: '2025-05-03' }
  ];

  newVoyage: Partial<Voyage> = { ship: '', departurePort: '', arrivalPort: '', date: '' };
  editingVoyage: Voyage | null = null;

  chartData = this.buildChartData();

  ngOnInit(): void {}

  buildChartData() {
    const shipCounts: Record<string, number> = {};
    this.voyages.forEach(v => {
      shipCounts[v.ship] = (shipCounts[v.ship] || 0) + 1;
    });
    return {
      labels: Object.keys(shipCounts),
      datasets: [
        {
          label: 'Voyages per Ship',
          data: Object.values(shipCounts),
          backgroundColor: '#00b4d8'
        }
      ]
    };
  }

  addVoyage(): void {
    if (this.newVoyage.ship && this.newVoyage.departurePort && this.newVoyage.arrivalPort && this.newVoyage.date) {
      const newId = this.voyages.length ? Math.max(...this.voyages.map(v => v.id)) + 1 : 1;
      this.voyages.push({ id: newId, ...this.newVoyage } as Voyage);
      this.newVoyage = { ship: '', departurePort: '', arrivalPort: '', date: '' };
      this.chartData = this.buildChartData();
    }
  }

  startEdit(voyage: Voyage): void {
    this.editingVoyage = { ...voyage };
  }

  saveEdit(edited: Voyage): void {
    const index = this.voyages.findIndex(v => v.id === edited.id);
    if (index !== -1) {
      this.voyages[index] = { ...edited };
      this.editingVoyage = null;
      this.chartData = this.buildChartData();
    }
  }

  cancelEdit(): void {
    this.editingVoyage = null;
  }

  deleteVoyage(id: number): void {
    this.voyages = this.voyages.filter(v => v.id !== id);
    this.chartData = this.buildChartData();
  }
}
