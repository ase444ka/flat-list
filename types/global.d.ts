export {};

declare global {
  interface Filters {
    rooms: Rooms[];
    priceFrom: number;
    priceTo: number;
    areaFrom: number;
    areaTo: number;
  }

  type requestBody = Partial<Filters>
  
  type Rooms = 1 | 2 | 3 | 4 | null;

  type Order = 1 | 0 | -1;
  
  interface Flat {
    id: number;
    image_url: string;
    title: string;
    rooms: Rooms;
    floor: number;
    total_floors: number;
    area: number;
    price: number;
  }
}
