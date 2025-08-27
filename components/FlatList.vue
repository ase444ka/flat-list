<template>
  <section class="flat-list">
    <h1>Квартиры</h1>
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
      <div class="flat-list__floor">2 <em>из 17</em></div>
      <div class="flat-list__price">
        {{ new Intl.NumberFormat('ru-RU').format(6650000) }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
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
