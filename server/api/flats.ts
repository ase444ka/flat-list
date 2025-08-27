import {promises as fs} from 'fs';
import path from 'path';
export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), 'data', 'flat-list.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const flats = JSON.parse(jsonData);
  return flats;
});
