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
