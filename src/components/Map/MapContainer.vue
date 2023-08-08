<script lang="ts">
import {defineComponent} from 'vue'
import {useMapStore} from "../../stores/MapStore.ts";

export default defineComponent({
  name: "MapContainer",

  setup() {
    const mapStore = useMapStore();

    return {
      mapStore
    };
  },

  data() {
    return {
      zoomLevel: 1,
      minZoom: 0.4,
      maxZoom: 10,

      isDragging: false,
      lastX: 0,
      lastY: 0,

      offsetX: 0,
      offsetY: 0,
    };
  },

  computed: {
    mapStyle(): string {
      return `transform: scale(${this.zoomLevel});`
    }
  },

  methods: {
    handleZoom(event: WheelEvent): void {
      // Prevent default wheel from scrolling the page.
      event.preventDefault();

      // Calculate new zoom level based on the wheel delta
      const zoomDelta = event.deltaY * -0.01;
      this.zoomLevel = Math.min(Math.max(this.zoomLevel + zoomDelta, this.minZoom), this.maxZoom)
    },

    startDrag(event: MouseEvent): void {
      this.isDragging = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    },

    handleDrag(event: MouseEvent): void {
      if (!this.isDragging) return;

      // Calculate the change in mouse position since the last event
      const deltaX = event.clientX - this.lastX;
      const deltaY = event.clientY - this.lastY;
      this.lastX = event.clientX;
      this.lastY = event.clientY;

      // Update the offset based on the mouse movement
      this.offsetX += deltaX;
      this.offsetY += deltaY;

      // Update the image position using the new offset
      this.updateImagePosition();
    },

    endDrag(): void {
      this.isDragging = false;
    },

    // Method to update the image position based on zoom and offset
    updateImagePosition(): void {

      // Get a reference to the map image element
      const image = this.$refs.mapContainer as HTMLImageElement;

      // Update the image's transform style to apply zoom and offset
      if (image) {
        image.style.transform = `scale(${this.zoomLevel}) translate(${this.offsetX}px, ${this.offsetY}px)`;
      }
    },
  }
})
</script>

<template>
  <div
      ref="mapContainer"
      class="map-container"
      v-if="mapStore.mapVisibility"
      @mousedown="startDrag"
      @mousemove="handleDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
  >
    <img
        ref="zoomMap"
        :src="mapStore.mapImageUrl"
        :style="mapStyle"
        @wheel="handleZoom"
        alt="Player Map"
        draggable="false">
  </div>
</template>

<style scoped>
.map-container {
  cursor: move;
  overflow: hidden;
  user-select: none;
}

img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.2s ease-out;
}
</style>