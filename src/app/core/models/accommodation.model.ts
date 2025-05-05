export interface Accommodation {
    id: number;
    country: string;
    name: string;
    type: string;         // ex: 'Hotel', 'Maison'
    city?: string;        // ville précise
    pricePerNight?: number; // pour filtrer ou calculer le prix
    stars?: number;       // 3 étoiles, 4 étoiles...
    image?: string;       // pour l'afficher
    availableFrom?: string; // date de début de disponibilité
    availableTo?: string;   // date de fin
  }
 