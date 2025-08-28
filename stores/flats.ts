import {ref, computed} from 'vue';
import axios from 'axios';
import {defineStore} from 'pinia';
interface FlatState {
  flats: Flat[] | [];
  error: string | null;
}

export const useFlatStore = defineStore('flats', () => {
  const flats = ref<Flat[]>([]);
  const error = ref<string | null>(null);

  const getFlats = async () => {
    try {
      const response = await axios.get('/api/flats');
      console.dir(response)
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
