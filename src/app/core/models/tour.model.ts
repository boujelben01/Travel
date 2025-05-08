
export interface Tour {
  id: number;
  title: string;
  country: string;
  price: number;
  description?: string;
  accommodationId?: number; // lien vers accommodation
  image?: string;
  duration?: number;
  continent?: string;
  itinerary?: string[]; 
}
