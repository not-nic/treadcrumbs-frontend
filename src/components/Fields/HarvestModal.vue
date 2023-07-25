<script lang="ts">
import {defineComponent} from 'vue'
import {useFieldStore} from "../../stores/FieldStore.ts";
import axios from "axios";

export default defineComponent({
  name: "HarvestModal",

  data() {
    return {
      showError: false
    }
  },

  methods: {
    close() {
      const fieldStore = useFieldStore();
      this.showError = false;

      return fieldStore.closeHarvestModal();
    },

    harvestField() {
      const fieldStore = useFieldStore();
      fieldStore.harvestField(fieldStore.currentField);
    },

    async storeCrops(): Promise<boolean> | undefined {
      const fieldStore = useFieldStore();

      if (fieldStore.currentCrop != undefined) {
        try {
          const response  = await axios.post('api/silos', {
            fillType: fieldStore.currentCrop,
            fillLevel: fieldStore.currentYield
          })

          console.log(`created silo`, response)

          this.harvestField();
          this.close()

        } catch (error) {
          console.error(`Could not create silo`, error)
        }
      } else {
        return this.showError = true;
      }

      return this.showError = false;
    },

    async sellCrops(): Promise<boolean> | undefined {
      const fieldStore = useFieldStore();

      if (fieldStore.currentCrop != undefined) {
        try {
          const response  = await axios.post('api/finances', {
            harvestIncome: fieldStore.currentProfit
          })

          console.log(`added harvest income:`, response)

          this.harvestField();
          this.close()
        } catch (error) {
          console.error(`Could not create finance stat`, error)
        }
      } else {
        return this.showError = true;
      }

      return this.showError = false;
    }
  }
})
</script>
<template>
  <div class="mask">
    <div class="box">
      <div class="container">
        <div class="header">
          <h2>Harvest Field</h2>
          <svg @click="close()" class="close" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.73077 14.4231C1.41214 14.7417 0.895549 14.7417 0.576923 14.4231C0.258297 14.1045 0.258297 13.5879 0.576923 13.2692L4.93194 8.91421C5.71299 8.13316 5.71299 6.86684 4.93194 6.08579L0.576923 1.73077C0.258297 1.41214 0.258297 0.895549 0.576923 0.576923C0.895549 0.258297 1.41214 0.258297 1.73077 0.576923L6.08579 4.93194C6.86684 5.71299 8.13317 5.71299 8.91421 4.93194L13.2692 0.576923C13.5879 0.258297 14.1045 0.258297 14.4231 0.576923C14.7417 0.895549 14.7417 1.41214 14.4231 1.73077L10.0681 6.08579C9.28701 6.86684 9.28701 8.13317 10.0681 8.91421L14.4231 13.2692C14.7417 13.5879 14.7417 14.1045 14.4231 14.4231C14.1045 14.7417 13.5879 14.7417 13.2692 14.4231L8.91421 10.0681C8.13316 9.28701 6.86684 9.28701 6.08579 10.0681L1.73077 14.4231Z" fill="#B2C5E1"/>
          </svg>
        </div>
        <div class="info">
          <span>Storing crops adds them to a silo to be sold later.</span>
          <span>Selling crops sells them at the estimated price.</span>
          <span class="error-text" v-show="showError">Fields with no crops cannot be harvested.</span>
        </div>
        <div class="actions">
          <button class="green" @click="storeCrops()">Store Crops</button>
          <button class="red" @click="sellCrops()">Sell Crops</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  background: #212833;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
  padding: 10px;
  margin: auto;

  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
}

.container {
  padding: 15px;
  background-color: #1e242e;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
}

.header {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10px;
}

.close {
  max-width: 28px;
  padding: 5px;
}

.close:hover {
  fill-opacity: 0.5;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-self: start;
  text-align: start;
  gap: 5px;
}

button {
  font-family: 'Overpass', sans-serif;
  color: white;
  background-color: #2EB36B;

  display: inline-flex;
  align-items: center;
  padding-top: 12px;
}

.info {
  padding-left: 5px;
  font-family: 'Overpass', sans-serif;
  font-weight: lighter;
  color: #B2C5E1;
}

button:hover {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.red {
  background-color: #b32e2e;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 0 10px 0;
}

.error-text {
  color: #b32e2e;
}
</style>