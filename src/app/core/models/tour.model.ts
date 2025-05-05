export interface Tour {
  id: number;
  title: string;
  country: string;
  price: number;
  description?: string;
  accommodation?: string;
  image?: string;
  duration?: number;
  continent?: string;
}
