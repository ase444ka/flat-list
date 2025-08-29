import {ref} from 'vue';
import axios from 'axios';
import {defineStore} from 'pinia';

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

  return {
    flats,
    error,
    getFlats,
  };
});
