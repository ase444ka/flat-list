<script lang="ts">
import '~/assets/css/main.css';
</script>
<template>
  <header>
    <h1>Квартиры</h1>
  </header>

  <section class="flat-list">
    <div class="flat-list__heading">
      <div class="flat-list__field-name">Планировка</div>
      <div class="flat-list__field-name">Квартира</div>
      <div class="flat-list__sort-by">
        S,м<sup>2</sup>
        <span class="flat-list__order">
          <SortAscIcon />
          <SortDescIcon />
        </span>
      </div>
      <div class="flat-list__sort-by">
        Этаж
        <span class="flat-list__order">
          <SortAscIcon />
          <SortDescIcon />
        </span>
      </div>
      <div class="flat-list__sort-by">
        Цена, &#8381;
        <span class="flat-list__order">
          <SortAscIcon />
          <SortDescIcon />
        </span>
      </div>
    </div>
    <div class="flat-list__item" v-for="n in 5">
      <div class="flat-list__image">
        <img src="/layouts/1.svg" alt="" />
      </div>
      <div class="flat-list__title">3-комнатная №104</div>
      <div class="flat-list__area">53.1</div>
      <div class="flat-list__floor"><em>2</em> из 17 этаж</div>
      <div class="flat-list__price">
        {{ new Intl.NumberFormat('ru-RU').format(6650000) }}
      </div>
    </div>
  </section>
  <aside class="flat-filters">
    <div class="flat-filters__radiogroup"></div>
    <div class="flat-filters__control">
      <div class="flat-filters__label"></div>
      <div class="flat-filters__range">
        <div class="flat-filters__limit_min">
          от
          <span class="flat-filters__limit-value"></span>
        </div>
        <div class="flat-filters__limit_max">
          до
          <span class="flat-filters__limit-value"></span>
        </div>
      </div>
    </div>
    <div class="flat-filters__control">
      <div class="flat-filters__label"></div>
      <div class="flat-filters__range">
        <div class="flat-filters__limit_min">
          от
          <span class="flat-filters__limit-value"></span>
        </div>
        <div class="flat-filters__limit_max">
          до
          <span class="flat-filters__limit-value"></span>
        </div>
        <MySlider />
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
h1 {
  font-weight: bold;
  font-size: 54px;
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
  }
  &__sort-by {
    display: flex;
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
}
</style>
