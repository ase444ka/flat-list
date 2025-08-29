<template>
  <aside class="flat-filters">
    <div class="flat-filters__radiogroup">
      <label :for="`rooms-${n}`" class="radio" v-for="n of 4">
        <input
          type="radio"
          name="rooms"
          :id="`rooms-${n}`"
          class="radio__input"
          :disabled="!filterStore.filters.rooms.includes(n as Rooms)"
          :value="n"
          v-model="rooms"
          @change="updateRooms"
        />
        <div class="radio__control">{{ n }}К</div>
      </label>
    </div>
    <template
      v-if="
        filterStore.filters.priceFrom &&
        filterStore.filters.priceTo &&
        filterStore.filters.areaFrom &&
        filterStore.filters.areaTo
      "
    >
      <MySlider
        :min="filterStore.filters.priceFrom"
        :max="filterStore.filters.priceTo"
        :disabled="pageStore.isBlocked"
        @change="updatePrice"
        label="Стоимость квартиры, &#8381;"
      />
      <MySlider
        :min="filterStore.filters.areaFrom"
        :max="filterStore.filters.areaTo"
        :disabled="pageStore.isBlocked"
        @change="updateArea"
        label="Площадь, м<sup>2</sup>"
      />
    </template>
    <template v-else> загрузка... </template>

    <button @click="resetAll">Сбросить параметры</button>
  </aside>
</template>

<script setup lang="ts">
import {useFilterStore} from '~/stores/filters';
import {usePageStore} from '~/stores/page';

const filterStore = useFilterStore();
const pageStore = usePageStore();

const rooms = ref(null);


function updateRooms() {
  pageStore.updateData({
    ...filterStore.filters,
    rooms: [rooms.value],
  });
}

function updatePrice(payload: {from: number; to: number}) {
  pageStore.updateData({
    ...filterStore.filters,
    priceFrom: payload.from,
    priceTo: payload.to,
  });
}

function updateArea(payload: {from: number; to: number}) {
  pageStore.updateData({
    ...filterStore.filters,
    areaFrom: payload.from,
    areaTo: payload.to,
  });
}

function resetAll() {
  filterStore.resetFilters();
  console.log('res')
  pageStore.updateData(filterStore.filters);
}
</script>

<style lang="scss" scoped>
.flat-filters {
  background: linear-gradient(
    135deg,
    rgba(174, 228, 178, 0.3) 0%,
    rgba(149, 208, 161, 0.3) 100%
  );
  min-width: 399px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  padding: 40px;
  &__radiogroup {
    display: flex;
    gap: 16px;
  }
}
.radio {
  &__input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    outline: none;
    border: none;
    opacity: 0;
  }
  &__control {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 6px 20px 0px #95d0a1;
    }
  }
  input:checked ~ &__control {
    background-color: #3eb57c;
    box-shadow: 0px 6px 20px 0px #95d0a1;
    color: white;
  }
  input[disabled] ~ &__control {
    color: #ced1d7;
    cursor: default;
    &:hover {
      box-shadow: inherit;
    }
  }
}
</style>
