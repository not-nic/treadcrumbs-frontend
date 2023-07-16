<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Map"
})
</script>

<template>
<div class="container">
  <div class="map">

  </div>
</div>
</template>

<style scoped>
.container {
  width: 1455px;
  padding: 15px;
  background-color: #212833;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
}

.map {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: rgba(0, 0, 0, 0.10);
  padding: 20px;
  overflow: auto;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
  height: 720px;
}
</style>