<script setup lang="ts">
import {Slider} from '@ark-ui/vue/slider';
const from = ref(0)
const to = ref(100)
function showDetails(details: {value: number[]}) {
  from.value = details.value[0]
  to.value = details.value[1]
}
</script>

<template>
  <ClientOnly fallback-tag="span" fallback="loading slider...">
    <Slider.Root :defaultValue="[from, to]" @value-change="showDetails">
      <Slider.Label>от {{ from }} до {{ to }}</Slider.Label>
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

<style>
.slider > * {
  width: 100%;
}

[data-scope='slider'][data-part='root'] {
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

[data-scope='slider'][data-part='root'][data-orientation='vertical'] {
  height: 240px;
}

[data-scope='slider'][data-part='control'] {
  --slider-thumb-size: 10px;
  --slider-track-height: 4px;
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
  background: blue;
}

[data-scope='slider'][data-part='thumb']:focus-visible {
  box-shadow: rgb(0 0 0 / 22%) 0px 0px 0px 5px;
}

[data-scope='slider'][data-part='thumb']:hover:not([data-disabled]) {
  background-color: rgb(245, 242, 255);
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
  background: blue;
  border-radius: inherit;
}

[data-scope='slider'][data-part='range'][data-disabled] {
  background: rgba(0, 0, 0, 0.4);
}

[data-scope='slider'][data-part='range'][data-orientation='horizontal'] {
  height: 100%;
}

[data-scope='slider'][data-part='range'][data-orientation='vertical'] {
  width: 100%;
}

[data-scope='slider'][data-part='value-text'] {
  margin-inline-start: 12px;
}

[data-scope='slider'][data-part='marker-group'][data-orientation='vertical'] {
  height: 100%;
}

[data-scope='slider'][data-part='marker'] {
  color: lightgray;
}

[data-scope='slider'][data-part='marker']:is(
    [data-state='under-value'],
    [data-state='at-value']
  ) {
  color: red;
}

[data-scope='slider'][data-part='dragging-indicator'] {
  background: magenta;
  border-radius: 4px;
  padding: 2px 4px;
  color: white;
  &[data-orientation='horizontal'] {
    top: calc(var(--slider-thumb-size) + 8px);
  }

  &[data-orientation='vertical'] {
    left: calc(var(--slider-thumb-size) + 8px);
  }
}
</style>
