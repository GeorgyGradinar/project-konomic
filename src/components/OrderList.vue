<template>
  <div class="order-list">
    <p>{{ name }}</p>
    <v-table height="40vh" fixed-header class="order-list__table">
      <thead>
        <tr>
          <th>
            price
          </th>
          <th>
            quantity
          </th>
          <th class="order-list__total">
            total
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="ask in orders" :key="ask.price">
          <td>{{ ask.price }}</td>
          <td>{{ ask.quantity }}</td>
          <td class="order-list__total">{{ ask.total }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'OrderList',

  props: ['orders', 'name'],
})
</script>

<style lang="scss">

.order-list {
  width: 70%;

  &__table > .v-table__wrapper {
    scrollbar-gutter: stable;
    overflow: hidden;
  }

  &__table:hover > .v-table__wrapper {
    overflow-y: auto;
  }
}

@media screen and (max-width: 600px) {
  .order-list {
    width: 100%;

    &__table {
      font-size: 12px;
      --v-table-header-height: 25px;

      & > .v-table__wrapper {
        overflow-y: auto;
      }
    }

    &__total {
      display: none;
    }
  }
}


</style>
