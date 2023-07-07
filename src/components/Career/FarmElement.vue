<script lang="ts">
import {defineComponent} from 'vue'
import { Farm } from "../../ts/Farm.ts";

export default defineComponent({
  name: "FarmElement",

  props: {
    farm: Farm
  },

  methods: {
    formatMoney(value: number | undefined): string {
      return new Intl.NumberFormat('en-gb', {style: 'currency', currency: 'GBP'}).format(value ?? 0);
    }
  }
})
</script>

<template>
  <div class="stat">
    <div class="row">
      <h2>Money:</h2>
      <h2 class="money green">{{formatMoney(farm?.money)}}</h2>
    </div>
    <img alt="split" src="../../assets/split.svg">
    <div class="row">
      <h2>Loans:</h2>
      <h2 class="money red">{{formatMoney(farm?.loan)}}</h2>
    </div>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  text-align: left;
  gap: 10px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

b {
  font-weight: bold
}

.money {
  font-family: "Fira Code", monospace;
  text-overflow: ellipsis;
  font-weight: 300;
}

.green {
  color: #85a52e;
}

.red {
  color: #a42d2e;
}
</style>