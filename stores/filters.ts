import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useFlatStore} from './flats';
import storage from '../utils/localStorage'

const initialFilters: Filters = {
  rooms: [1, 2, 3, 4],
  priceFrom: 0,
  priceTo: 0,
  areaFrom: 0,
  areaTo: 0,
}

export const useFilterStore = defineStore('filters', () => {
  const filters = ref<Filters>(initialFilters);

  function resetFilters() {
    filters.value = initialFilters
  }

  function init() {
    const savedFilters = storage.get('filters')
    if (savedFilters) {
      filters.value = savedFilters
    } else {
      filters.value = initialFilters
    }
  }

  function getFilters() {
    const flatStore = useFlatStore();
    const accessibleFilters = flatStore.flats.reduce(
      (prev: Filters, cur: Flat, index) => {
        const filters = {
          ...prev,
        };
        if (!filters.rooms.includes(cur.rooms)) {
          filters.rooms.push(cur.rooms);
        }
        if (filters.priceFrom > cur.price || filters.priceFrom === 0) {
          filters.priceFrom = cur.price;
        }
        if (filters.priceTo < cur.price || filters.priceFrom === 0) {
          filters.priceTo = cur.price;
        }
        if (filters.areaFrom > cur.area || filters.areaFrom === 0) {
          filters.areaFrom = cur.area;
        }
        if (filters.areaTo < cur.area || filters.areaFrom === 0) {
          filters.areaTo = cur.area;
        }
        return filters;
      },
      {rooms: [], priceFrom: 0, priceTo: 0, areaFrom: 0, areaTo: 0}
    );
    filters.value = accessibleFilters;
    storage.set('filters', filters.value)
  }



  return {
    filters,
    getFilters,
    resetFilters,
    init,
  };
});
