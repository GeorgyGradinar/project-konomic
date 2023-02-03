<template>
  <div class="header">
    <v-btn depressed color="primary" to="/"> Main</v-btn>
    <v-btn depressed color="primary" to="symbol">Choose cryptocurrency</v-btn>
  </div>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped>
.header {
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
