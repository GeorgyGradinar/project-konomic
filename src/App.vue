<template>
  <v-app>
    <AppHeader></AppHeader>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import AppHeader from '@/components/Header.vue'

export default defineComponent({
  name: 'App',

  components: {
    AppHeader
  },

  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
  .v-main {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: calc(100vh - 50px);
  }
</style>
