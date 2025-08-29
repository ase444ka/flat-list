<template>
  <section class="flat-list">
    <h1>Квартиры</h1>
    <div class="flat-list__heading">
      <div class="flat-list__field-name flat-list__field-name_to_img">Планировка</div>
      <div class="flat-list__field-name flat-list__field-name_to_title">Квартира</div>
      <div
        class="flat-list__sort-by flat-list__sort-by_to_area"
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
        class="flat-list__sort-by flat-list__sort-by_to_floor"
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
        class="flat-list__sort-by flat-list__sort-by_to_price"
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
      <div class="flat-list__title">
        {{ flat.rooms }}
      </div>
      <div class="flat-list__area">{{ flat.area }}</div>
      <div class="flat-list__floor">
        {{ flat.floor }} <em>из {{ flat.total_floors }}</em>
      </div>
      <div class="flat-list__price">
        {{ new Intl.NumberFormat('ru-RU').format(flat.price) }}
      </div>
    </div>
    <button
      @click="getAnother"
      v-if="pageStore.hasAnotherFlats"
      ref="get-another"
    >
      загрузить еще
    </button>
  </section>
  <button class="scroll" @click="scrollUp" v-if="showScrollButton">
    <ArrowUpIcon />
  </button>
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

const currentHeight = ref<number | null>(null);
const currentScroll = ref<number | null>(null);

const showAnotherButton = useTemplateRef<HTMLButtonElement>('get-another');

const setCurrentScroll = () => {
  const h = document.documentElement.scrollHeight;
  currentScroll.value = h;
};

const setCurrentHeight = () => {
  const h = document.documentElement.clientHeight;
  currentHeight.value = h;
};

onMounted(() => {
  setCurrentHeight();
  window.addEventListener('resize', setCurrentHeight);
  window.addEventListener('scroll', setCurrentScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setCurrentHeight);
  document.removeEventListener('scroll', setCurrentScroll);
});

const scrollUp = () => {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
};

const showScrollButton = computed(
  () =>
    currentScroll.value &&
    currentHeight.value &&
    currentScroll.value > currentHeight.value
);

const areaOrder = ref<Order>(0);

const priceOrder = ref<Order>(0);

const floorOrder = ref<Order>(0);

function sortByArea() {
  floorOrder.value = priceOrder.value = 0;
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
  areaOrder.value = floorOrder.value = 0;

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
  areaOrder.value = priceOrder.value = 0;

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
  pageStore.sortShowingFlats(
    floorOrder.value,
    areaOrder.value,
    priceOrder.value
  );
});

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

async function getAnother() {
  pageStore.getAnotherFlats();
  await nextTick();
  if (showAnotherButton.value) {
    showAnotherButton.value.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });

  }
}
</script>

<style lang="scss" scoped>
.scroll {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: #3eb57c;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
}
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
    grid-template-areas: 'a b c d e';
    gap: 20px;
    @media (max-width: 960px) {
      grid-template-columns: 80px 80px 1fr;
      grid-template-areas: 'c d e';
    }
  }
  &__field-name {
    padding-top: 5px;

    &_to_img {
      grid-area: 'a';
    }
    &_to_title {
      grid-area: 'b';
    }
  }
  &__item {
    display: grid;
    font-size: 16px;
    color: rgba(11, 23, 57, 1);
    padding: 16px 0 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    grid-template-columns: 80px 1fr 120px 120px 120px;
    grid-template-areas: "a b c d e";
    gap: 20px;
    @media (max-width: 960px) {
      font-size: 14px;
      grid-template-columns: auto auto auto 1fr;
      grid-template-areas:  "b b b a"
                            "c d e a";
    }
    em {
      color: #848a9b;
      font-style: normal;
    }
  }
  &__image {
    grid-area: a;
    justify-self: end;
  }
  &__title {
    grid-area: b;
  }
  &__area {
    grid-area: c;
  }
  &__floor {
    grid-area: d;
  }
  &__price {
    grid-area: e;
  }
  &__sort-by {
    display: flex;
    gap: 5px;
    align-items: center;
    cursor: pointer;
    &_to_floor {
      grid-area: c;
    }
    &_to_area {
      grid-area: d;
    }
    &_to_price {
      grid-area: e;
    }
    
  }
  &__order {
    display: flex;
    flex-direction: column;
    padding-top: 5px;
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
  @media (max-width: 700px) {
    order: 1;
  }
}
</style>
