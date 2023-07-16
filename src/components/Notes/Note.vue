<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Note"
})
</script>

<template>
<div class="container">
  <div class="note">

  </div>
</div>
</template>

<style scoped>
.container {
  width: 660px;
  padding: 15px;
  background-color: #212833;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
}

.note {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: rgba(0, 0, 0, 0.10);
  padding: 20px;
  height: 100%;
  overflow: auto;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
}
</style>