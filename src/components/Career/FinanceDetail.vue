<script lang="ts">
import {defineComponent} from 'vue'
import { Detail } from '../../ts/Detail.ts'

export default defineComponent({
  name: "FinanceDetail",

  props: {
    detail: {
      type: Detail,
      default: new Detail('Unknown',  0, [{key: 'unknown', value: 0}])
    }
  },

  methods: {
    isNegativeNumber(value: number | undefined): boolean {
      return value != null ? value < 0: false;
    },

    formatMoney(value: number | null): string {

      let formattedNumber = new Intl.NumberFormat('en-gb', {style: 'currency', currency: 'GBP'}).format(value ?? 0);

      if (value != null && value > 0) {
        return '+' + formattedNumber
      }

      return formattedNumber
    },
  }
})
</script>

<template>
  <details>
    <summary>
      <span class="detail key bold">{{detail.title}}:</span>
      <span v-if="isNegativeNumber(detail.totalValue)" class="detail value red">{{formatMoney(detail.totalValue)}}</span>
      <span v-else class="value green">{{formatMoney(detail.totalValue)}}</span>
    </summary>
    <div class="items">
      <div v-for="item in detail?.items" :key="item.key" class="item">
        <span class="detail key">{{item.key}}:</span>
        <span v-if="isNegativeNumber(item.value)" class="detail value red">{{formatMoney(item.value)}}</span>
        <span v-else class="value green">{{formatMoney(item.value)}}</span>
      </div>
    </div>
  </details>
</template>

<style scoped>
details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}

.bold {
  font-weight: 500;
}

.items {
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
}

.item {
  display: flex;
  justify-content: space-between;
}

summary {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
}
</style>