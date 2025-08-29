<script setup lang="ts">
import {Slider} from '@ark-ui/vue/slider';
const {max, min, label, disabled} = defineProps<{
  max: number;
  min: number;
  label: string;
  disabled: boolean;
}>();



const emit = defineEmits<{
  (e: 'change', payload: {from: number; to: number}): void
}>()
const from = ref(min);
const to = ref(max);


watchEffect(() => {
  from.value = min
  to.value = max
})

const percent = computed(() => (max - min) / 100);

function changeLabels(details: {value: number[]}) {
  from.value = Math.floor(details.value[0] * percent.value + min);
  to.value = Math.floor(details.value[1] * percent.value + min);
}

function emitChanges(details: {value: number[]}) {
  emit('change', {
    from: Math.floor(details.value[0] * percent.value + min),
    to: Math.ceil(details.value[1] * percent.value + min),
  });
}
</script>

<template>
  <ClientOnly fallback-tag="span" fallback="loading slider...">
    <Slider.Root
      :defaultValue="[1, 100]"
      :disabled="disabled"
      @value-change="changeLabels"
      @value-change-end="emitChanges"
    >
      <Slider.Label>
        <div class="slider__label" v-html="label"></div>
        <div class="slider__limits">
          <div class="slider__from">
            от {{ new Intl.NumberFormat('ru-RU').format(from) }}
          </div>
          <div class="slider__to">
            до {{ new Intl.NumberFormat('ru-RU').format(to) }}
          </div>
        </div>
      </Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb :index="0">
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb :index="1">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  </ClientOnly>
</template>

<style lang="scss">
.slider {
  * {
    width: 100%;
  }
  &__limits {
    display: flex;
    justify-content: space-between;
  }
  &__label {
    font-size: 14px;
  }
}

[data-scope='slider'][data-part='root'] {
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

[data-scope='slider'][data-part='control'] {
  --slider-thumb-size: 14px;
  --slider-track-height: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

[data-scope='slider'][data-part='control'][data-orientation='horizontal'] {
  height: var(--slider-thumb-size);
}

[data-scope='slider'][data-part='thumb'] {
  all: unset;
  width: var(--slider-thumb-size);
  height: var(--slider-thumb-size);
  border-radius: 999px;
  background: #3eb57c;
}

[data-scope='slider'][data-part='thumb']:focus-visible {
  box-shadow: 0px 6px 20px 0px #95d0a1;
}

[data-scope='slider'][data-part='thumb']:hover:not([data-disabled]) {
  background-color: #ced1d7;
}

[data-scope='slider'][data-part='thumb'][data-disabled] {
  background-color: lightgray;
}

[data-scope='slider'] .control-area {
  margin-top: 12px;
  display: flex;
}

.slider [data-orientation='horizontal'] .control-area {
  flex-direction: column;
  width: 100%;
}

.slider [data-orientation='vertical'] .control-area {
  flex-direction: row;
  height: 100%;
}

[data-scope='slider'][data-part='track'] {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
}

[data-scope='slider'][data-part='track'][data-orientation='horizontal'] {
  height: var(--slider-track-height);
  width: 100%;
}

[data-scope='slider'][data-part='track'][data-orientation='vertical'] {
  height: 100%;
  width: var(--slider-track-height);
}

[data-scope='slider'][data-part='range'] {
  background: #3eb57c;
  border-radius: inherit;
}

[data-scope='slider'][data-part='range'][data-disabled] {
  background: rgba(0, 0, 0, 0.4);
}

[data-scope='slider'][data-part='range'][data-orientation='horizontal'] {
  height: 100%;
}

[data-scope='slider'][data-part='marker'] {
  background: #3eb57c;
}
</style>
