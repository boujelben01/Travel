import { Accommodation } from './accommodation.model';

export interface Reservation {
  continent: string;
  country: string;
  date1: string; // Date de début
  date2: string; // Date de fin
  persons: number; // Nombre de personnes
  accommodation?: Accommodation; // Hébergement sélectionné (optionnel)
}