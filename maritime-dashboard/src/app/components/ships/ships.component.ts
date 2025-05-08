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
import { ShipService } from '../../services/ship.service';
import { Ship } from '../../models/ship.model';

@Component({
  selector: 'app-ships',
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
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
  ships: Ship[] = [];
  newShip: Partial<Ship> = { shipName: '', maxSpeed: 0 };
  editingShip: Ship | null = null;

  chartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Speed (knots)',
        data: [],
        backgroundColor: '#2196f3'
      }
    ]
  };

  constructor(private shipService: ShipService) {}

  ngOnInit(): void {
    this.loadShips();
  }

  loadShips(): void {
    this.shipService.getShips().subscribe(data => {
      this.ships = data;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.chartData = {
      labels: this.ships.map(s => s.shipName),
      datasets: [
        {
          label: 'Speed (knots)',
          data: this.ships.map(s => s.maxSpeed),
          backgroundColor: '#2196f3'
        }
      ]
    };
  }

  addShip(): void {
    if (this.newShip.shipName && this.newShip.maxSpeed != null) {
      const shipToSend = {
        ...this.newShip,
        Voyages: []
      };
      this.shipService.createShip(shipToSend).subscribe(() => {
        this.loadShips();
        this.newShip = { shipName: '', maxSpeed: 0 };
      });
    }
  }

  startEdit(ship: Ship): void {
    this.editingShip = { ...ship };
  }

  saveEdit(ship: Ship): void {
    if (ship.id != null) {
      this.shipService.updateShip(ship.id, ship).subscribe(() => {
        this.editingShip = null;
        this.loadShips();
      });
    }
  }

  cancelEdit(): void {
    this.editingShip = null;
  }

  deleteShip(id: number): void {
    this.shipService.deleteShip(id).subscribe(() => this.loadShips());
  }
}
