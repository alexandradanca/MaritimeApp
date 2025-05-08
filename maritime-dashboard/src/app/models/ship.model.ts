import { Voyage } from './voyage.model';


export interface Ship {
  id?: number;
  shipName: string;
  maxSpeed: number;
  Voyages?: any;
}
