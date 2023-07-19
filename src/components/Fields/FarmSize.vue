<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FarmSize",

  props: {
    totalFarmSize: String
  }
})
</script>

<template>
  <div class="stat">
    <div class="row">
      <h3>Total Farm Size:</h3>
    </div>
    <h3 class="ha">{{totalFarmSize}}Ha</h3>
  </div>
</template>

<style scoped>
.stat {
  display: flex;
  gap: 20px;
  padding-top: 10px;
}

h3 {
  margin: 0;
  color: rgba(178, 197, 225, 1);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

.ha {
  font-family: "Fira Code", monospace;
  text-overflow: ellipsis;
  font-weight: 300;
  color: rgb(179, 106, 46);
}
</style>