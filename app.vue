<template>
  <main>
    <FlatList />
    <FlatFilters />
  </main>
</template>

<script lang="ts">
import '~/assets/css/main.css';
</script>

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
</style>
