<script lang="ts">
import {defineComponent} from 'vue';
import {Coordinate} from "../../ts/Coordinate.ts";
import EditVehicle from "./EditVehicle.vue";
import axios from "axios";

export default defineComponent({
  name: "VehicleEntry",

  components: {
    EditVehicle
  },

  data() {
    return {
      attachmentInfo: "",
      noJob: "no previous job.",
    }
  },

  props: {
    id: Number,
    name: String,
    position: Coordinate,
    lastJob: String,
    propertyState: String,
    age: Number,
    price: Number,
    operatingTime: Number,
    wear: Number,
    farmId: Number,
    numberPlate: String,
    fuel: Number,
    attachment: {
      type: Array as () => number[],
      default: () => []
    }
  },

  mounted() {
    this.displayAttachmentInfo();
  },

  methods: {
    roundPos(axis: any): number | undefined {
      return Math.round(axis)
    },

    openVehicleModal(id: number | undefined) {
      this.$emit("open", id)
    },

    calculateWear(damage: number | undefined) {
      return damage != undefined ? (damage * 100).toFixed(1) : 0;
    },

    calculateOperatingTime(operatingTime: number | undefined) {
      return operatingTime != undefined ? (operatingTime / 3600).toFixed(1) : 0;
    },

    calculateFuel(fuel: number | undefined) {
      return fuel != undefined ? fuel.toFixed(1) : 0;
    },

    async displayAttachmentInfo() {
      try {
        this.attachmentInfo = await this.getAttachmentInfo(this.attachment);
      } catch (error) {
        console.error("Error loading attachment information:", error);
      }
    },

    async getAttachmentInfo(attachments: Array<number>): Promise<string> {
      const results: String[] = [];

      if (!attachments) {
        return '';
      }

      for (let i = 0; i < attachments.length; i++) {
        const currAttachment = attachments[i];
        try {
          const response = await axios.get(`api/implements/${currAttachment}`)
          results.push(response.data.name);
        } catch (error) {
          console.error(`Error getting attachment ${currAttachment}:`, error)
        }
      }

      return results.join(' | ');
    }
  }
})
</script>

<template>
  <div class="entry">
    <div class="image-container">
      <img v-if="propertyState != 'owned'" src="../../assets/key.svg" alt="lease icon" class="ownership">
      <img class="vehicle-image" src="../../assets/icon.png" alt="default icon"/>
      <div class="num-plate">{{ numberPlate }}</div>
    </div>
    <div class="vehicle-data">
      <div class="header">
        <div class="header-text">
          <h2>{{ name }}</h2>
          <a @click="openVehicleModal(id)">Edit</a>
        </div>
        <span class="attachment" v-if="attachmentInfo != ''">{{ attachmentInfo }}</span>
      </div>
      <div class="entry-body">
        <div class="row">
          <div class="data">
            <span class="key">Pos:</span>
            <span class="value"> {{ roundPos(position?.x) }}, {{ roundPos(position?.y) }}, {{ roundPos(position?.z) }} </span>
          </div>
          <div class="data">
            <img class="icon" src="../../assets/job.svg" alt="Last job icon"/>
            <span class="value" v-if="lastJob != ''">{{ lastJob }}</span>
            <span class="value" v-else>{{ noJob }}</span>
          </div>
        </div>
        <div class="row">
          <div class="data">
            <img class="icon" src="../../assets/time_good.svg" alt="Operating time icon"/>
            <span class="value">{{ calculateOperatingTime(operatingTime) }}<b>Hrs</b></span>
          </div>
          <div class="data">
            <img class="icon" src="../../assets/wear.svg" alt="wear level icon"/>
            <span class="value">{{ calculateWear(wear) }}<b>%</b></span>
          </div>
          <div class="data">
            <img class="icon" src="../../assets/fuel.svg" alt="fuel level icon"/>
            <span class="value">{{ calculateFuel(fuel) }}<b>L</b></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0;
  color: rgba(178, 197, 225, 1);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  width: 400px;
  text-overflow: ellipsis;
  flex-grow: 1;
}

.entry {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: start;
  text-align: left;
}

.vehicle-data {
  display: flex;
  flex-direction: column;
  flex: 1 0;
}

.image-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 0 0 125px;
  position: relative;
}

.vehicle-image {
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 10px;
  width: 100%;
}

.num-plate {
  font-family: 'Fira Code', monospace;
  text-align: center;
  border: 3px solid #ddb93b;
  border-radius: 10px;
  color: #ddb93b;
  font-size: 20px;
}

.header-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-top: 15px;
}

.attachment {
  font-family: 'Overpass', sans-serif;
  color: rgba(178, 197, 225, 0.80);
  text-align: justify;
}

.ownership {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 25%;
  rotate: 40deg;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 10px;
}

.data {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}

.icon {
  max-width: 50px;
  max-height: 50px;
  aspect-ratio: 1/1;
  padding: 5px;
}

.key {
  font-family: 'Overpass', sans-serif;
  color: rgba(178, 197, 225, 0.80);
  padding: 5px 5px 1px 5px;
}

.value {
  font-family: 'Fira Code', monospace;
  font-weight: 300;
  color: #B36A2E;
  padding: 5px;
}
</style>