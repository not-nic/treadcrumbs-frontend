<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useMapStore} from "../../stores/MapStore.ts";

export default defineComponent({
  name: "ImageUploader",

  setup() {
    const mapFile = ref<HTMLInputElement | null>(null);
    const mapStore = useMapStore();

    const onFileChange = (event: Event) => {

      console.log("upload image file")

      const target = event.target as HTMLInputElement;

      if (target.files && target.files?.length > 0) {
        const selectedFile = target.files[0];

        const imageUrl = URL.createObjectURL(selectedFile);

        mapStore.setMapImage(imageUrl);
      }
    };

    const getImageSize = (file: File) =>
        new Promise<{height: number; width: number}>((resolve) => {
          const image = new Image();
          image.onload = () => {
            const imageSize = {
              height: image.height,
              width: image.width
            };
            resolve(imageSize)
          };
          image.src = URL.createObjectURL(file)
        })

    const submit = async () => {
      if (!mapFile.value) {
        return;
      }

      const file = mapFile.value.files ? mapFile.value.files[0] : null;
      if (!file) {
        return;
      }

      const imageSize = await getImageSize(file);
      mapStore.setImageSize(imageSize);
      mapStore.showMap()
      console.log('Image Size:', imageSize);
    }

    return {
      mapStore,
      mapFile,
      onFileChange,
      submit,
    };
  }
})
</script>

<template>
  <div v-if="!mapStore.mapVisibility">
    <input type="file" ref="mapFile" @change="onFileChange" />
    <button @click="submit">Upload Image</button>
  </div>
</template>

<style scoped>

</style>