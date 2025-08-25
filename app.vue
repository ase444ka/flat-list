<template>
  <header>
    <h1>Квартиры</h1>
  </header>
  <section class="flat-list">
    <div class="flat-list__heading">
      <div class="flat-list__field-name">
        Планировка
      </div>
      <div class="flat-list__field-name">
        Квартира
      </div>
      <div class="flat-list__sort-by">
        S,м<sup>2</sup>
        <span class="flat-list__order">
        </span>
      </div>
      <div class="flat-list__sort-by">
        Этаж
        <span class="flat-list__order">
        </span>
      </div>
      <div class="flat-list__sort-by">
        Цена, &#8381;
        <span class="flat-list__order">
        </span>
      </div>
    </div>
    <div class="flat-list__item" v-for="n in 5">
      <div class="flat-list__image">
        <img src="/layouts/1.svg" alt="">
      </div>
      <div class="flat-list__title">3-комнатная №104</div>
      <div class="flat-list__area">53.1</div>
      <div class="flat-list__floor"><em>2</em> из 17 этаж</div>
      <div class="flat-list__price">{{new Intl.NumberFormat("ru-RU").format(
    6650000,
  )}}</div>
    </div>
  </section>  
  <aside class="flat-filters">
    <div class="flat-filters__radiogroup">

    </div>
    <div class="flat-filters__control">
      <div class="flat-filters__label">

      </div>
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
      <div class="flat-filters__label">

      </div>
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
  </aside>
</template>
