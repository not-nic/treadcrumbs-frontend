<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
import FarmSize from "./FarmSize.vue";
import FieldChart from "./FieldChart.vue";
import { crops } from '../../ts/Crops.ts'

export interface Field {
  id: number,
  previousCrop: string,
  currentCrop: string,
  farmlandId: number,
  growthStage: number,
  fieldSizeHa: number,
  fertilized: number,
  limed: number,
  owned: boolean,
  plowed: boolean,
  mulched: boolean,
  weeded: boolean
}

interface Crop {
  name: string,
  colour: string
}

export default defineComponent({
  name: "FieldTable",
  components: {FieldChart, FarmSize},

  data() {
    return {
      fields: [] as Field[],
      crops: crops
    }
  },

  mounted() {
    this.getFields()
  },

  computed: {
    filteredFields(): Field[] {
      const filteredFields = this.fields.filter(field => field.fieldSizeHa != null);
      const combinedFields: { [cropType: string]: Field } = {};

      for (const field of filteredFields) {
        const currentCrop = field.currentCrop.toLowerCase();
        const fieldSize = field.fieldSizeHa;

        if (currentCrop != undefined && currentCrop in combinedFields) {
          combinedFields[currentCrop].fieldSizeHa += fieldSize;
        } else {
          combinedFields[currentCrop] = { ...field };
        }
      }
      return Object.values(combinedFields);
    },

    pieChartData() {
      return {
        datasets: [
          {
            backgroundColor: ["#ceab4f", "#b36a2e", "#8c634f", "#9cc251", "#897247", "#d9a38f"],
            data: [194, 80, 69, 194, 103, 13]
          }
        ]
      }
    },

    pieChartOptions() {
      return {
        plugins: {
          tooltip: {
            enabled: false
          }
        }
      }
    }
  },

  methods: {
    async getFields() {
      try {
        const response = await axios.get('api/fields');
        this.fields = response.data
        this.updatePieChartData();

      } catch (error) {
        console.error(error)
      }
    },

    updatePieChartData() {
      this.pieChartData.datasets[0].data = this.filteredFields.map((field) => field.fieldSizeHa);
      this.pieChartData.datasets[0].backgroundColor = this.filteredFields.map((field) =>
          this.getCropColour(field.currentCrop)
      );
    },

    formatHectare(value: number): number {
      return (value / 10000)
    },

    calculateTotalFarmSize(): number {
      let farmSize = 0

      for (const field of this.fields) {
        if (field.fieldSizeHa != null) {
          farmSize += field.fieldSizeHa;
        }
      }

      return this.formatHectare(farmSize);
    },

    getCropColour(cropType: string): string | undefined {
        const crop = this.crops.find((crop) => crop.name.toLowerCase() === cropType.toLowerCase());
        return crop ? crop.colour : undefined;
    },

    calculateCropPercentage(plantedArea: number): string {
      return ((plantedArea / this.calculateTotalFarmSize()) * 100).toFixed(1);
    },

  },
})
</script>

<template>
  <farm-size :total-farm-size="calculateTotalFarmSize().valueOf().toFixed(1)"></farm-size>
  <div class="field-container">
    <div class="donut">
      <field-chart :data="pieChartData" :options="pieChartOptions"></field-chart>
    </div>
    <div class="table">
      <table>
        <tr v-for="field in filteredFields" :key="field.id">
          <th><div class="circle" :style="{ backgroundColor: getCropColour(field.currentCrop)}"></div></th>
          <th class="crop-name">{{field.currentCrop}}</th>
          <th class="field-share" :style="{ color: getCropColour(field.currentCrop)}">{{calculateCropPercentage(formatHectare(field.fieldSizeHa))}}%</th>
          <th class="field-size">{{formatHectare(field.fieldSizeHa).toFixed(1)}} <b>Ha</b></th>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>

.field-container {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
}

.donut {
  flex: 1;
  max-width: 250px;
  max-height: 250px;
}

.table {
  flex: 1;
}

table {
  width: 100%;
  height: 100%;
}

.circle {
  width: 15px;
  height: 15px;
  border-radius: 20px;
}

.crop-name {
  font-family: 'Overpass', sans-serif;
  color: rgba(178, 197, 225, 0.80);
  padding: 5px 5px 1px 5px;
  text-align: left;
}

.field-size {
  font-family: 'Fira Code', monospace;
  font-weight: 300;
  color: #8395b0;
  padding: 5px;
  text-align: right;
}

.field-share {
  font-family: 'Fira Code', monospace;
  font-weight: bold;
  padding: 5px;
  text-align: left;
}

b {
  font-weight: bold;
}
</style>