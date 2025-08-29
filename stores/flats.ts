import {ref} from 'vue';
import axios from 'axios';
import {defineStore} from 'pinia';
import sort from '../utils/sort-flats';

export const useFlatStore = defineStore('flats', () => {
  const flats = ref<Flat[] | []>([]);
  const error = ref<string | null>(null);

  const getFlats = async (body: Partial<Filters>) => {
    try {
      const response = await axios.post('/api/flats', body);
      flats.value = response.data;
      error.value = null; // Сбрасываем ошибку при успешном запросе
    } catch (error: any) {
      error.value = error.response?.data?.message || 'Произошла ошибка';
    }
  };

  const sortFlats = (floor: Order, area: Order, price: Order) => {
    flats.value = sort(flats.value, floor, area, price);
  };

  return {
    flats,
    error,
    getFlats,
    sortFlats
  };
});
