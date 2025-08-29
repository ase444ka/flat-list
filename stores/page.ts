import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useFlatStore} from './flats';
import {useFilterStore} from './filters';

function* generatePagination(flats: Flat[] | []) {
  let page = 0;
  let value, done;
  while (true) {
    page++;
    if (page === 1) {
      value = flats.slice(0, 5) as Flat[] | [];
      done = flats.length <= 5;
    } else {
      console.log('page ', page, 'it is ', 5 + (page - 1) * 20);
      done = flats.length <= 5 + (page - 1) * 20;
      value = flats.slice(5 + (page - 2) * 20).slice(0, 20) as Flat[] | [];
    }
    if (done) {
      return value;
    } else {
      yield value;
    }
  }
}

export const usePageStore = defineStore('page', () => {
  const flatListToShow = ref<Flat[] | []>([]);
  const isBlocked = ref<boolean>(false);
  const hasAnotherFlats = ref<boolean>(true);
  const flatStore = useFlatStore();
  const filterStore = useFilterStore();
  let getPage = generatePagination(flatStore.flats);

  async function applyFilters() {
    isBlocked.value = true;
    await flatStore.getFlats(filterStore.filters);
    filterStore.getFilters();
    getPage = generatePagination(flatStore.flats);
    const {value, done} = getPage.next();
    hasAnotherFlats.value = !done;
    flatListToShow.value = value;
  }

  function getAnotherFlats() {
    if (!hasAnotherFlats.value) {
      return;
    }
    const {value, done} = getPage.next();
    hasAnotherFlats.value = !done;
    flatListToShow.value = [...flatListToShow.value, ...value];
  }

  return {
    flatListToShow,
    isBlocked,
    hasAnotherFlats,
    applyFilters,
    getAnotherFlats,
  };
});
