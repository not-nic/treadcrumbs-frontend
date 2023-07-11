<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
import FarmElement from "./FarmElement.vue";
import { Farm } from "../../ts/Farm.ts";
import Finances from "./FinanceElement.vue";
import FinanceElement from "./FinanceElement.vue";

interface Career {
  id: Number,
  saveGameName: String,
  mapTitle: String,
  difficulty: Number,
  dateCreated: Date
}

export default defineComponent({
  name: "Career",
  components: {FinanceElement, Finances, FarmElement},

  computed: {
    Farm() {
      return Farm
    }
  },

  data() {
    return {
      career: {} as Career,
      farm: {} as Farm
    }
  },

  mounted() {
    this.getCareer();
    this.getFarm();
  },

  methods: {
    async getCareer() {
      try {
        const response = await axios.get('api/career')
        this.career = response.data[0]

      } catch (error) {
        console.error("Error getting career: ", error)
      }
    },

    async getFarm() {
      try {
        const response = await axios.get('/api/farm')
        this.farm = response.data[0]

        // console.log(this.farm)
      } catch (error) {
        console.error("Error getting Farm: ", error)
      }
    },
  }
})
</script>

<template>
<div class="container">
  <div class="career">
    <div class="dashboard-element">
      <h2>Farm Finances</h2>
      <div class="buttons">
        <a>Edit</a>
        <svg @click="getCareer()" class="refresh" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20C7.22917 20 4.86979 19.026 2.92188 17.0781C0.973959 15.1302 0 12.7708 0 10C0 7.22917 0.973959 4.86979 2.92188 2.92188C4.86979 0.973959 7.22917 0 10 0C11.7708 0 13.3229 0.359375 14.6563 1.07813C15.1538 1.34633 15.6267 1.65153 16.0749 1.99371C16.8304 2.57042 18.125 2.08344 18.125 1.13302V0.9375C18.125 0.419733 18.5447 0 19.0625 0V0C19.5803 0 20 0.419733 20 0.9375V6.9375C20 7.48979 19.5523 7.9375 19 7.9375H13C12.4822 7.9375 12.0625 7.51777 12.0625 7V7C12.0625 6.48223 12.4822 6.0625 13 6.0625H15.4955C16.2836 6.0625 16.7435 5.20102 16.2075 4.62323C15.6398 4.01119 14.9977 3.48052 14.2813 3.03125C13.0521 2.26042 11.625 1.875 10 1.875C7.72917 1.875 5.80729 2.66146 4.23437 4.23437C2.66146 5.80729 1.875 7.72917 1.875 10C1.875 12.2708 2.66146 14.1927 4.23437 15.7656C5.80729 17.3385 7.72917 18.125 10 18.125C11.7292 18.125 13.3125 17.6302 14.75 16.6406C15.9956 15.7832 16.9127 14.6872 17.5013 13.3527C17.6658 12.9797 18.0234 12.7188 18.4311 12.7188V12.7188C19.063 12.7188 19.5224 13.3227 19.2836 13.9077C18.6117 15.5534 17.5484 16.9174 16.0938 18C14.3021 19.3333 12.2708 20 10 20Z" fill="#B2C5E1"/>
        </svg>
      </div>
    </div>
    <div class="farm-info">
      <div class="row">
        <div class="item">
          <span class="key">Created:</span>
          <span class="value">{{ career.dateCreated }}</span>
        </div>
        <img alt="split" src="../../assets/split.svg">
        <div class="item">
          <span class="key">Map:</span>
          <span class="value">{{ career.mapTitle }}</span>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <span class="key">Player:</span>
          <span class="value">Nick</span>
        </div>
        <img alt="split" src="../../assets/split.svg">
        <div class="item">
          <span class="key">Save Game:</span>
          <span class="value">{{ career.saveGameName  }}</span>
        </div>
      </div>
      <farm-element :farm="new Farm(farm.id, farm.farmName, farm.loan, farm.money, farm.players)"></farm-element>
      <finance-element></finance-element>
    </div>
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

.career {
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

.value {
  color: #B36A2E;
}

</style>