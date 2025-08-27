<script lang="ts">
import '~/assets/css/main.css';
</script>
<template>
  <main>
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
    <aside class="flat-filters">
      <div class="flat-filters__radiogroup">
        <label for="rooms-1" class="radio">
          <input type="radio" name="rooms" id="rooms-1" class="radio__input" />
          <div class="radio__control">1К</div>
        </label>
        <label for="rooms-2" class="radio">
          <input type="radio" name="rooms" id="rooms-2" class="radio__input" />
          <div class="radio__control">1К</div>
        </label>
        <label for="rooms-3" class="radio">
          <input type="radio" name="rooms" id="rooms-3" class="radio__input" />
          <div class="radio__control">1К</div>
        </label>
        <label for="rooms-4" class="radio">
          <input
            type="radio"
            disabled
            name="rooms"
            id="rooms-4"
            class="radio__input"
          />
          <div class="radio__control">1К</div>
        </label>
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
  </main>
</template>

<style lang="scss">
body {
  margin: 0 auto;
}
main {
  margin: 96px auto 0;
  display: flex;
  gap: 80px;
  max-width: 1440px;
  justify-content: center;
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
  }
  input:checked ~ &__control {
    background-color: #3eb57c;
    box-shadow: 0px 6px 20px 0px #95d0a1;
    color: white;
  }
  input[disabled] ~ &__control {
    color: #ced1d7;
    cursor: default;
  }
}
</style>
