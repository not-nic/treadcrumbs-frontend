<template>
  <div>
    <input type="file" @change="changeFile" ref="file" />
    <button @click="uploadFile" :disabled="!file">Upload Save</button>
    <p class="error" v-if="!status">No dashboard created, upload a file to get started.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from 'axios'

export default defineComponent({
  name: "Upload",

  data() {
    return {
      file: null as File | null,
      status: null as boolean | null
    }
  },

  mounted() {
    this.healthCheck();
  },

  methods: {

    changeFile(event: Event) {
      const target = event.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        this.file = target.files[0];
      } else {
        this.file = null;
      }
    },

    async healthCheck() {
      try {
        const response = await axios.get('api/savegame/status');

        if (response.data) {
          this.$router.push({name: 'dashboard'});
        } else {
          this.status = false
        }

      } catch (error) {
        console.error(error)
      }
    },

    async uploadFile() {
      if (this.file) {
        try {
          const formData = new FormData(); {
            formData.append('file', this.file);

            const response = await axios.post('/api/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            console.log('File uploaded Successfully:', response.data);
            this.$router.push({name: 'dashboard'});
          }
        } catch (error) {
            console.error('Error uploading file:', error)
        }
      }
    }
  }
})
</script>

<style scoped>

.error {
  color: #ff6666;
  font-weight: bold;
}

</style>