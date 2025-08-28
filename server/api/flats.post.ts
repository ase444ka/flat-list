import {promises as fs} from 'fs';
import path from 'path';


function getFilteredFlats(flats: Flat[], body: requestBody) : Flat[] {
  return flats.filter(f => {
    if (body.priceTo && ( f.price > body.priceTo)) {
      return false
    }
    if (body.priceFrom && f.price < body.priceFrom) {
      return false
    }
    if (body.areaTo && ( f.area > body.areaTo)) {
      return false
    }
    if (body.areaFrom && f.area < body.areaFrom) {
      return false
    }
    if (body.rooms && !body.rooms.includes(f.rooms)) {
      return false
    }
    return true
  })
}
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filePath = path.join(process.cwd(), 'data', 'flat-list.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const flats = JSON.parse(jsonData);
  return getFilteredFlats(flats, body);
});
