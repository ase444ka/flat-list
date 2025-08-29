<template>
  <section class="flat-list">
    <h1>Квартиры</h1>
    <div class="flat-list__heading">
      <div class="flat-list__field-name">Планировка</div>
      <div class="flat-list__field-name">Квартира</div>
      <div
        class="flat-list__sort-by"
        :class="areaSortClass"
        @click="sortByArea"
      >
        S,м<sup>2</sup>
        <span class="flat-list__order">
          <SortAscIcon :class="areaAscClass" />
          <SortDescIcon :class="areaDescClass" />
        </span>
      </div>
      <div
        class="flat-list__sort-by"
        :class="floorSortClass"
        @click="sortByFloor"
      >
        Этаж
        <span class="flat-list__order">
          <SortAscIcon :class="floorAscClass" />
          <SortDescIcon :class="floorDescClass" />
        </span>
      </div>
      <div
        class="flat-list__sort-by"
        :class="priceSortClass"
        @click="sortByPrice"
      >
        Цена, &#8381;
        <span class="flat-list__order">
          <SortAscIcon :class="priceAscClass" />
          <SortDescIcon :class="priceDescClass" />
        </span>
      </div>
    </div>
    <div class="flat-list__item" v-for="flat in pageStore.flatListToShow">
      <div class="flat-list__image">
        <img :src="flat.image_url" alt="планировка" />
      </div>
      <div class="flat-list__title">{{`${flat.rooms}-комнатная ${flat.title}` }}</div>
      <div class="flat-list__area">{{ flat.area }}</div>
      <div class="flat-list__floor">
        {{ flat.floor }} <em>из {{ flat.total_floors }}</em>
      </div>
      <div class="flat-list__price">
        {{ new Intl.NumberFormat('ru-RU').format(flat.price) }}
      </div>
    </div>
    <button @click="getAnother" v-if="pageStore.hasAnotherFlats">
      загрузить еще
    </button>
  </section>
</template>

<script setup lang="ts">
import {usePageStore} from '~/stores/page';
import {useFilterStore} from '~/stores/filters';
import {useFlatStore} from '~/stores/flats';
const pageStore = usePageStore();
const flatStore = useFlatStore();

function getData(params: Filters) {
  const filterStore = useFilterStore();
  const pageStore = usePageStore();
  pageStore.updateData(filterStore.filters);
}

const areaOrder = ref<Order>(0);

const priceOrder = ref<Order>(0);

const floorOrder = ref<Order>(0);


function sortByArea() {
  floorOrder.value = priceOrder.value = 0
  switch (areaOrder.value) {
    case 0:
      areaOrder.value = 1;
      break;
    case 1:
      areaOrder.value = -1;
      break;
    case -1:
      areaOrder.value = 0;
      break;
  }
}

function sortByPrice() {
  areaOrder.value = floorOrder.value = 0

  switch (priceOrder.value) {
    case 0:
      priceOrder.value = 1;
      break;
    case 1:
      priceOrder.value = -1;
      break;
    case -1:
      priceOrder.value = 0;
      break;
  }
}

function sortByFloor() {
  areaOrder.value = priceOrder.value = 0

  switch (floorOrder.value) {
    case 0:
      floorOrder.value = 1;
      break;
    case 1:
      floorOrder.value = -1;
      break;
    case -1:
      floorOrder.value = 0;
      break;
  }
}

watchEffect(() => {
  flatStore.sortFlats(floorOrder.value, areaOrder.value, priceOrder.value);
  pageStore.sortShowingFlats(floorOrder.value, areaOrder.value, priceOrder.value);
})

const areaAscClass = computed(() =>
  areaOrder.value === 1 ? 'green-icon' : ''
);
const areaDescClass = computed(() =>
  areaOrder.value === -1 ? 'green-icon' : ''
);
const areaSortClass = computed(() => (!!areaOrder.value ? 'green' : ''));

const priceAscClass = computed(() =>
  priceOrder.value === 1 ? 'green-icon' : ''
);
const priceDescClass = computed(() =>
  priceOrder.value === -1 ? 'green-icon' : ''
);
const priceSortClass = computed(() => (!!priceOrder.value ? 'green' : ''));

const floorAscClass = computed(() =>
  floorOrder.value === 1 ? 'green-icon' : ''
);
const floorDescClass = computed(() =>
  floorOrder.value === -1 ? 'green-icon' : ''
);
const floorSortClass = computed(() => (!!floorOrder.value ? 'green' : ''));

onMounted(getData);

function getAnother() {
  pageStore.getAnotherFlats();
}
</script>

<style lang="scss" scoped>
.green-icon {
  * {
    color: #3eb57c !important;
  }
}
.green {
  color: #3eb57c !important;
  sup {
    color: #3eb57c !important;
  }
}
h1 {
  font-weight: bold;
  font-size: 54px;
  margin: 10px 5px;
  padding: 0;
}

.flat-list {
  &__heading {
    display: grid;
    padding: 0 0 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    grid-template-columns: 80px 1fr 120px 120px 120px;
    gap: 20px;
  }
  &__item {
    display: grid;
    font-size: 16px;
    color: rgba(11, 23, 57, 1);
    padding: 16px 0 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    grid-template-columns: 80px 1fr 120px 120px 120px;
    gap: 20px;
    em {
      color: #848a9b;
      font-style: normal;
    }
  }
  &__sort-by {
    display: flex;
    cursor: pointer;
  }
  &__order {
    display: flex;
    flex-direction: column;
    width: 20px;
    height: 20px;
    use {
      width: 10px;
      height: 10px;
    }
  }
  button {
    font-size: 16px;
    margin-top: 40px;
    background-color: inherit;
    width: 156;
    height: 40;
    padding-top: 8px;
    padding-right: 24px;
    padding-bottom: 8px;
    padding-left: 24px;
    border-radius: 25px;
    border-width: 1px;
    border-color: #0b173933;
  }
}
</style>
