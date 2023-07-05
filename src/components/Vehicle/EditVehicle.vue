<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EditVehicle",

  methods: {
    close(): void {
      this.$emit("close")
    }
  }
})
</script>

<template>
  <div class="mask">
    <div class="box">
      <h2>Vehicle Information</h2>
      <svg @click="close()" class="close" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.73077 14.4231C1.41214 14.7417 0.895549 14.7417 0.576923 14.4231C0.258297 14.1045 0.258297 13.5879 0.576923 13.2692L4.93194 8.91421C5.71299 8.13316 5.71299 6.86684 4.93194 6.08579L0.576923 1.73077C0.258297 1.41214 0.258297 0.895549 0.576923 0.576923C0.895549 0.258297 1.41214 0.258297 1.73077 0.576923L6.08579 4.93194C6.86684 5.71299 8.13317 5.71299 8.91421 4.93194L13.2692 0.576923C13.5879 0.258297 14.1045 0.258297 14.4231 0.576923C14.7417 0.895549 14.7417 1.41214 14.4231 1.73077L10.0681 6.08579C9.28701 6.86684 9.28701 8.13317 10.0681 8.91421L14.4231 13.2692C14.7417 13.5879 14.7417 14.1045 14.4231 14.4231C14.1045 14.7417 13.5879 14.7417 13.2692 14.4231L8.91421 10.0681C8.13316 9.28701 6.86684 9.28701 6.08579 10.0681L1.73077 14.4231Z" fill="#B2C5E1"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>

h2 {
  margin: 0;
  color: rgba(178, 197, 225, 1);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-align: start;
}

.close {
  max-width: 28px;
  padding: 5px;
}

.close:hover {
  max-width: 28px;
  padding: 5px;
  fill-opacity: 0.5;
}

.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.box {
  background: #232F41;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  width: 600px;
  padding: 20px;
  margin: auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>