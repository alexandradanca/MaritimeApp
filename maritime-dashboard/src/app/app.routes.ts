import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './components/dashboard/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShipsComponent } from './components/ships/ships.component';
import { PortsComponent } from './components/ports/ports.component';
import { CountriesComponent } from './components/countries/countries.component';
import { VoyagesComponent } from './components/voyages/voyages.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: 'ships', component: ShipsComponent },
      { path: 'ports', component: PortsComponent },
      { path: 'countries', component: CountriesComponent },
      { path: 'voyages', component: VoyagesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]}
];

