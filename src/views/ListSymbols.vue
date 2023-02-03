<template>
  <div class="block-drop-down">
    <v-col>
      <v-select
          :items="symbols"
          label="Outlined style"
          outlined
          v-model="currentCrypto"
      ></v-select>
    </v-col>
  </div>


</template>
<script lang='ts'>
import {defineComponent} from 'vue'
import {Store, useStore} from "vuex";
import {StoredData, key} from "@/store";
import {DEFAULT_SYMBOL, SYMBOLS_COUNT} from "@/config";
import {requestBinance} from "@/mixins/request-binance";

interface ComponentData {
  symbols: string[],
  currentCrypto: string,
  $store: Store<StoredData>
}

export default defineComponent({
  name: 'ListSymbols',

  created() {
    requestBinance.method.getAllSymbols().then(result => {
      const symbols = result.data.symbols.slice(0, SYMBOLS_COUNT);

      this.symbols = symbols.map((symbol: { baseAsset: string }) => symbol.baseAsset);
    })

    this.currentCrypto = this.$store.state.currentCrypto;
  },

  data(): ComponentData {
    return {
      symbols: [],
      currentCrypto: DEFAULT_SYMBOL,
      $store: useStore(key)
    }
  },

  unmounted() {
    this.$store.state.currentCrypto = this.currentCrypto;
  }
})
</script>

<style lang="scss" scoped>

.block-drop-down {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
