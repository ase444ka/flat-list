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
  * {
    color: rgba(11, 23, 57, 1);
  }
}
main {
  margin: 96px auto;
  display: flex;
  gap: 80px;
  max-width: 1440px;
  justify-content: center; 
  @media (max-width: 960px) {
      gap: 20px;
      margin: 48px;
    }
    @media (max-width: 700px) {
      flex-direction: column;
    }
}
</style>
