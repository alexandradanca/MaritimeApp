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

interface Country {
  id: number;
  name: string;
}

@Component({
  selector: 'app-countries',
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
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [
    { id: 1, name: 'Romania' },
    { id: 2, name: 'Italy' },
    { id: 3, name: 'France' }
  ];

  newCountry: Partial<Country> = { name: '' };
  editingCountry: Country | null = null;

  chartData = this.buildChartData();

  ngOnInit(): void {}

  buildChartData() {
    const portCounts = {
      'Romania': 2,
      'Italy': 3,
      'France': 1
    };

    return {
      labels: Object.keys(portCounts),
      datasets: [
        {
          label: 'Ports per Country',
          data: Object.values(portCounts),
          backgroundColor: '#90e0ef'
        }
      ]
    };
  }

  addCountry(): void {
    if (this.newCountry.name) {
      const newId = this.countries.length ? Math.max(...this.countries.map(c => c.id)) + 1 : 1;
      this.countries.push({ id: newId, name: this.newCountry.name });
      this.newCountry = { name: '' };
      this.chartData = this.buildChartData();
    }
  }

  startEdit(country: Country): void {
    this.editingCountry = { ...country };
  }

  saveEdit(edited: Country): void {
    const index = this.countries.findIndex(c => c.id === edited.id);
    if (index !== -1) {
      this.countries[index] = { ...edited };
      this.editingCountry = null;
      this.chartData = this.buildChartData();
    }
  }
  

  cancelEdit(): void {
    this.editingCountry = null;
  }

  deleteCountry(id: number): void {
    this.countries = this.countries.filter(c => c.id !== id);
  }
}
