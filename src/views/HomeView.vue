<template>
  <div class="order-book">
    <OrderList :orders="asks" :name="'Asks'"></OrderList>
    <p class="order-book__symbol">{{ currentSymbol }}USDT</p>
    <OrderList :orders="bids" :name="'Bids'"></OrderList>
  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Order} from "@/interfaces/order.interface";
import {Store, useStore} from "vuex";
import {StoredData, key} from "@/store";
import {requestBinance} from "@/mixins/request-binance";
import {webSockets} from "@/mixins/web-sockets";

interface ComponentData {
  asks: Order[],
  bids: Order[],
  currentSymbol: string,
  $store: Store<StoredData>
}

import OrderList from '../components/OrderList.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    OrderList,
  },

  mounted() {
    this.currentSymbol = this.$store.state.currentCrypto;

    requestBinance.method.getAllOrders(this.currentSymbol);
    webSockets.method.webSocket(this.currentSymbol);

    this.asks = this.$store.state.asks;
    this.bids = this.$store.state.bids;
  },

  data(): ComponentData {
    return {
      asks: [],
      bids: [],
      currentSymbol: '',
      $store: useStore(key)
    }
  },

  watch: {
    '$store.state.asks'() {
      this.asks = this.$store.state.asks;
    },
    '$store.state.bids'() {
      this.bids = this.$store.state.bids;
    },
    '$store.state.currentCrypto'() {
      this.currentSymbol = this.$store.state.currentCrypto;
    },
  },

  unmounted() {
    webSockets.method.closeWS()
  }
});
</script>

<style lang="scss" scoped>
.order-book {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;

  &__symbol {
    font-weight: bold;
  }
}

@media screen and (max-width: 600px) {
  .order-book {
    gap: 10px;
  }
}
</style>

