<script lang="ts">
import {defineComponent} from 'vue'
import {Pie} from "vue-chartjs";

import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default defineComponent({
  name: "FieldChart",
  components: {Pie},

  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    data: {
      immediate: true,
      handler(newValue, oldValue) {
        // console.log('Data Changed:', newValue, oldValue)
      }
    }
  }
})
</script>

<template>
  <Pie :data="data" :options="options"></Pie>
</template>

<style scoped>

</style>