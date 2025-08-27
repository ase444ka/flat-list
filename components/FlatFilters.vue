<template>
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
</template>

<script setup lang="ts"></script>

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
