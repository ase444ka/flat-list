import {promises as fs} from 'fs';
import path from 'path';


export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), 'data', 'flat-list.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const flats = JSON.parse(jsonData);
  const accessibleFilters = flats.reduce(
    (prev: Filters, cur: Flat) => {
      console.log(prev);
      const filters = {
        ...prev,
      };
      if (!filters.rooms.includes(cur.rooms)) {
        filters.rooms.push(cur.rooms);
      }
      if (filters.priceFrom > cur.price || filters.priceFrom === 0) {
        filters.priceFrom = cur.price;
      }
      if (filters.priceTo < cur.price) {
        filters.priceTo = cur.price;
      }
      if (filters.areaFrom > cur.area || filters.areaFrom === 0) {
        filters.areaFrom = cur.area;
      }
      if (filters.areaTo < cur.area) {
        filters.areaTo = cur.area;
      }
      return filters;
    },
    {rooms: [], priceFrom: 0, priceTo: 0, areaFrom: 0, areaTo: 0}
  );
  return accessibleFilters;
});
