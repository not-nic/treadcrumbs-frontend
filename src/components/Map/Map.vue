<script lang="ts">
import {defineComponent} from 'vue'
import MapContainer from "./MapContainer.vue";
import ImageUploader from "./ImageUploader.vue";

export default defineComponent({
  name: "Map",
  components: {ImageUploader, MapContainer}
})
</script>

<template>
<div class="container">
  <div class="map">
    <div class="dashboard-element">
      <h2>Map</h2>
    </div>
    <div class="center">
      <image-uploader></image-uploader>
      <map-container></map-container>
    </div>
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

.dashboard-element {
  padding: 10px;
  z-index: 999;
  margin: 20px;
  background-color: #1E242E;
  border: 2px solid #32373F;
  border-radius: 10px;
  width: 100px;
  display: flex;
  justify-content: center;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.map {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.10);
  overflow: hidden;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
  height: 720px;
}
</style>