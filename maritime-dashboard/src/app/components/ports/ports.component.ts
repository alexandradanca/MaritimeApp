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

interface Port {
  id: number;
  name: string;
  country: string;
}

@Component({
  selector: 'app-ports',
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
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.css']
})
export class PortsComponent implements OnInit {
  ports: Port[] = [
    { id: 1, name: 'Constanta', country: 'Romania' },
    { id: 2, name: 'Genoa', country: 'Italy' },
    { id: 3, name: 'Marseille', country: 'France' }
  ];

  newPort: Partial<Port> = { name: '', country: '' };
  editingPort: Port | null = null;

  chartData = this.buildChartData();

  ngOnInit(): void {}

  buildChartData() {
    const countryCounts = this.ports.reduce((acc: Record<string, number>, port) => {
      acc[port.country] = (acc[port.country] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(countryCounts),
      datasets: [
        {
          label: 'Ports per Country',
          data: Object.values(countryCounts),
          backgroundColor: '#00b4d8'
        }
      ]
    };
  }

  addPort(): void {
    if (this.newPort.name && this.newPort.country) {
      const newId = this.ports.length ? Math.max(...this.ports.map(p => p.id)) + 1 : 1;
      this.ports.push({ id: newId, name: this.newPort.name, country: this.newPort.country });
      this.newPort = { name: '', country: '' };
      this.chartData = this.buildChartData();
    }
  }

  startEdit(port: Port): void {
    this.editingPort = { ...port };
  }

  saveEdit(edited: Port): void {
    const index = this.ports.findIndex(p => p.id === edited.id);
    if (index !== -1) {
      this.ports[index] = { ...edited };
      this.editingPort = null;
      this.chartData = this.buildChartData();
    }
  }

  cancelEdit(): void {
    this.editingPort = null;
  }

  deletePort(id: number): void {
    this.ports = this.ports.filter(p => p.id !== id);
    this.chartData = this.buildChartData();
  }
}
