<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {Field} from "./FieldTable.vue";
import EditField from "./EditField.vue";
import {crops} from "../../ts/Crops.ts";
import {useFieldStore} from "../../stores/FieldStore.ts";
import axios from "axios";

export default defineComponent({
  name: "FieldDropdown",
  components: {EditField},

  setup() {
    const difficulty = ref<number | null>(2)

    const getDifficulty = async (): Promise<void> => {
      try {
        const response = await axios.get('api/career')

        difficulty.value = response.data[0].difficulty;
      } catch (error) {
        console.error('Error getting difficulty - defaulting to normal (2)')
      }
    }

    onMounted( () => {
      getDifficulty()
    })

    return { difficulty }
  },

  props: {
    field: {} as Field,
  },

  data() {
    return {
      crops: crops,
      profit: Number,
      yield: Number,
      crop: String
    }
  },

  methods: {
    booleanToText(value: boolean): string {
      return value ? "Yes" : "No";
    },

    sendField(field: Field): void {
      this.$emit("field", field)
    },

    getCropImage(cropName: string): string | undefined {
      const crop = crops.find(c => c.name === cropName);
      return crop ? `src/assets/crops/${crop.filepath}` : `src/assets/crops/missing.png`;
    },

    formatHectare(value: number): number {
      return (value / 10000)
    },

    getCropName(cropName: string): string | undefined {
      const crop = crops.find(c => c.name === cropName);
      let currentCrop =  crop ? crop.name : undefined

      if (currentCrop != undefined) {
        return this.crop = currentCrop;
      }

      console.log("crop does not exist");

      return this.crop = undefined;
    },

    growthCalculator(currentGrowthStage: number, cropName: string): string {

      const crop = crops.find(c => c.name === cropName);
      let totalGrowthStage = crop ? crop.growthStages : 0;

      const maizeRegexPattern: RegExp = /\b(?:corn|maize)\b/

      // check edge case for maize forage - where it can be harvested while it is still growing
      if (maizeRegexPattern.test(cropName.toLowerCase()) && currentGrowthStage == 5) {
        return `Forage (${currentGrowthStage}/${totalGrowthStage})`
      }

      // check if crop growth stages, if true they must be ready to harvest
      if (currentGrowthStage == totalGrowthStage) {
        return `Ready to harvest (${currentGrowthStage}/${totalGrowthStage})`
      }

      // check if the crop stages are not equal, must be growing.
      if (currentGrowthStage < totalGrowthStage) {
        return `Growing (${currentGrowthStage}/${totalGrowthStage})`
      }

      // check if the crop has exceeded the total growth stage, if true the crop is withered.
      if (currentGrowthStage > totalGrowthStage) {
        return `Withered (${currentGrowthStage}/${totalGrowthStage})`
      }

      return "Something went wrong getting your crop growth stats"
    },

    nitrogenCalculator(currentNitrogenLevel: number, cropName: string): object {

      const crop = crops.find(c => c.name === cropName);

      let perfectNitrogenLevel = crop ? crop.nitrogenLevel : 0;

      const tolerancePercentage = 10;
      const tolerance = perfectNitrogenLevel * tolerancePercentage / 100;

      const minAcceptableBoundary = 0.5;

      let minAcceptable: number = perfectNitrogenLevel * minAcceptableBoundary;
      let maxAcceptable: number = perfectNitrogenLevel + tolerance;

      // Debug print
      // let averageAcceptable: number = (minAcceptable + perfectNitrogenLevel) / 2
      // console.log(`${cropName} perfect nitrogen is: ${perfectNitrogenLevel}, worst case: ${minAcceptable}, average case: ${averageAcceptable}, best case: ${maxAcceptable}`)

      // edge case for crops with 0 required nitrogen level (soybeans & oilseed).
      if (perfectNitrogenLevel === 0) {
        if (currentNitrogenLevel > 0) {
          return {text: `Perfect: (${currentNitrogenLevel}/${perfectNitrogenLevel})`, colour: '#2EB36B'}
        }
      }

      // check if perfect nitrogen level is reached
      if (currentNitrogenLevel === perfectNitrogenLevel) {
        return {text: `Perfect: (${currentNitrogenLevel}/${perfectNitrogenLevel})`, colour: '#2EB36B'}
      }

      // check if current nitrogen level is within minimum acceptable boundary.
      if (currentNitrogenLevel < minAcceptable) {
        return {text: `Bad: (${currentNitrogenLevel}/${perfectNitrogenLevel})`, colour: '#B32E2E'}
      } else if (currentNitrogenLevel > minAcceptable && currentNitrogenLevel < perfectNitrogenLevel) {
        return {text: `Okay: (${currentNitrogenLevel}/${perfectNitrogenLevel})`, colour: '#A0B32E'}
      } else if (currentNitrogenLevel <= maxAcceptable) {
        return {text: `Good: (${currentNitrogenLevel}/${perfectNitrogenLevel})`, colour: '#61B32E'}
      }

      return {text: "Something went wrong calculating fertilizer level", colour: '#B36A2E'}
    },

    nitrogenToPercent(currentNitrogen: number, cropName: string): number {
      const crop = crops.find(c => c.name === cropName);
      let perfectNitrogenLevel = crop ? crop.nitrogenLevel : 0

      if (perfectNitrogenLevel === 0) {
        return 100
      }

      const nitrogenPercentage = (currentNitrogen / perfectNitrogenLevel) * 100;

      return Math.round(nitrogenPercentage * 100) / 100;
    },

    pHCalculator(pH: number): object {
      if (pH >= 6.500 && pH <= 7.000) {
        return {text: `${pH.toFixed(3)}/7.000`, colour: '#2EB36B'}
      } else if (pH >= 5.000 && pH <= 6.499) {
        return {text: `${pH.toFixed(3)}/7.000`, colour: '#61B32E'}
      } else if (pH >= 3.000 && pH <= 4.999) {
        return {text: `${pH.toFixed(3)}/7.000`, colour: '#A0B32E'}
      } else {
        return {text: `${pH.toFixed(3)}/7.000`, colour: '#B32E2E'}
      }
    },

    pHtoPercent(pH: number): number {
      const maxPH = 7.000;
      const minPH = 0.000;

      if (pH <= minPH) {
        return 0;
      } else if (pH >= maxPH) {
        return 100;
      } else {
        return Math.round(((pH - minPH) / (maxPH - minPH)) * 100);
      }
    },

    calculateProfit(totalYield: number, cropName: string, difficulty: number): string {
      const crop = crops.find(c => c.name === cropName);
      const pricePerL = crop ? crop.price : 0;

      let multiple = 1

      if (difficulty == 1) {
        multiple = 3.0
      } else if (difficulty == 2) {
        multiple = 1.5
      } else {
        multiple = 1
      }

      let profit = (pricePerL * totalYield) * multiple

      this.profit = profit;
      return  new Intl.NumberFormat('en-gb', {style: 'currency', currency: 'GBP'}).format(profit)
    },

    calculateYield(field: Field): number {
      const crop = crops.find(c => c.name === field.currentCrop);
      const yieldPerHa = crop ? crop.yieldPerHa : 0;
      const cropName = crop ? crop.name : "no crop"

      let fertilizerBonus = (this.nitrogenToPercent(field.fertilized, cropName) / 100) * 40;
      let fertilizerYieldBonus = ((yieldPerHa * fertilizerBonus) / 100)

      let pHBonus = (this.pHtoPercent(field.limed) / 100) * 15;
      let pHYieldBonus = (yieldPerHa * pHBonus) / 100

      let weedControlBonus = field.weeded ? (yieldPerHa * 20) / 100 : 0
      let plowingBonus = field.plowed ? (yieldPerHa * 15) / 100 : 0
      let mulchingBonus = field.mulched ? (yieldPerHa * 2.5) / 100 : 0

      let totalYield = (yieldPerHa + fertilizerYieldBonus + pHYieldBonus + weedControlBonus + plowingBonus + mulchingBonus) * this.formatHectare(field.fieldSizeHa)

      this.yield = totalYield;
      return totalYield
    },

    harvestField(field: Field) {
      const fieldStore = useFieldStore();
      fieldStore.openHarvestModal();

      this.getCropName(field.currentCrop)

      fieldStore.currentProfit = this.profit;
      fieldStore.currentYield = this.yield;
      fieldStore.currentCrop = this.crop;
      fieldStore.currentField = field;
    }
  }
})
</script>

<template>
  <div class="field">
    <div class="field-info">
      <div class="header">
        <img :src="getCropImage(field.currentCrop)" alt="crop icon">
        <h3>Field {{field.farmlandId}}</h3>
        <h3 class="ha">[{{ (field.fieldSizeHa / 10000).toFixed(2) }}Ha]</h3>
      </div>
      <div class="functions">
        <a @click="harvestField(field)">Harvest</a>
      </div>
      <div class="edit">
        <a @click="sendField(field)">Edit</a>
      </div>
    </div>
    <div class="field-content">
      <div class="left-column">
        <div class="field-stat">
          <div class="label">
            <img class="icon" src="../../assets/fields/growthstage.svg" alt="growth stage icon">
            <span class="key">Growth Stage:</span>
          </div>
          <span class="value">{{growthCalculator(field.growthStage, field.currentCrop)}}</span>
        </div>
        <div class="field-stat">
          <div class="label">
            <img class="icon" src="../../assets/fields/fert.svg" alt="fertilizer icon">
            <span class="key">Fertilizer Level:</span>
          </div>
          <span :style="{color: nitrogenCalculator(field.fertilized, field.currentCrop).colour}" class="value">{{nitrogenCalculator(field.fertilized, field.currentCrop).text}} <span class="grey">kg/ha</span></span>
        </div>
        <div class="field-stat">
          <div class="label">
            <img class="icon" src="../../assets/fields/lime.svg" alt="lime icon">
            <span class="key">Lime Level:</span>
          </div>
          <span :style="{color: pHCalculator(field.limed).colour}" class="value">{{pHCalculator(field.limed).text}} <span class="grey">pH</span></span>
        </div>
      </div>
      <div class="right-column">
        <div class="field-stat">
          <div class="label">
            <img class="icon" src="../../assets/fields/weed.svg" alt="weeds icon">
            <span class="key">Weeded:</span>
          </div>
          <span class="value">{{booleanToText(field.weeded)}}</span>
        </div>
        <div class="field-stat">
          <div class="label">
            <img class="icon" src="../../assets/fields/plow.svg" alt="plowed icon">
            <span class="key">Plowed:</span>
          </div>
          <span class="value">{{booleanToText(field.plowed)}}</span>
        </div>
        <div class="field-stat">
          <div class="label">
            <img class="icon" src="../../assets/fields/mulch.svg" alt="mulched icon">
            <span class="key">Mulched:</span>
          </div>
          <span class="value">{{booleanToText(field.mulched)}}</span>
        </div>
      </div>
    </div>
    <div class="yield">
      <span class="key">Current Yield & Profit:</span>
      <span class="value">{{new Intl.NumberFormat().format(calculateYield(field))}}l</span>
      <span> - </span>
      <span class="value">{{calculateProfit(calculateYield(field), field.currentCrop, difficulty)}}</span>
    </div>
  </div>
</template>

<style scoped>

img {
  width: 50px;
  border-radius: 10px;
  padding: 5px;
  border: 2px solid rgba(89, 89, 89, 0.30);
}

.key {
  font-family: 'Overpass', sans-serif;
  color: #B2C5E1;
  padding: 0;
}

.value {
  font-family: 'Fira Code', monospace;
  font-weight: 300;
  color: #B36A2E;
  padding: 5px;
}

.grey {
  color: #485261;
  font-weight: 500;
}

h3 {
  margin: 0;
  color: rgba(178, 197, 225, 1);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

.ha {
  font-family: "Fira Code", monospace;
  text-overflow: ellipsis;
  font-weight: 300;
  color: #8395b0;
}

.field {
  background-color: #1b2029;
  padding: 10px;
  border-radius: 12px;
  border: 2px solid #32373F;
  width: 640px;
}

.field-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.edit {
  padding: 10px;
}

.functions {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.field-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 10px 10px 0 10px;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.left-column {
  flex-basis: 70%;
}

.right-column {
  flex-basis: 30%;
}

.field-stat {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: start;
}

.icon {
  max-width: 30px;
  border: none;
  padding: 0;
}

.label {
  display: flex;
  align-items: self-end;
  gap: 10px;
}

.yield {
  padding-top: 10px;
}
</style>