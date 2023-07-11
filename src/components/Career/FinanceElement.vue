<script lang="ts">
import {defineComponent, onMounted, ref, watchEffect} from 'vue'
import { Finance, useFinanceStore } from "../../stores/FarmFinanceStore.ts";
import { Detail } from "../../ts/Detail.ts";
import FinanceDetail from "./FinanceDetail.vue";


export default defineComponent({
  name: "FinanceElement",
  components: {FinanceDetail},

  setup() {
    const financeStore = useFinanceStore();
    const allVehicleCosts = ref<number | null>(null);
    const allAnimalCosts = ref<number | null>(null);
    const allBuildingCosts = ref<number | null>(null);
    const allFieldCosts = ref<number | null>(null);
    const allSales = ref<number | null>(null);
    const allOtherCosts = ref<number | null>(null);
    let summedProperties = {} as any;

    const calculateAll = (objects: Finance[]): void => {

      // loop over a singular object
      for (const obj of objects) {
        for (const key of Object.keys(obj)) {
          // Debug print
          // console.log(`summed${key}: ${financeStore.sumProperty(objects, key)}`)

          // format key to camel case i.e. summedVehicleCost
          let formattedKey = `summed${key.charAt(0).toUpperCase() + key.slice(1)}`

          // populate object with key and value
          summedProperties[formattedKey] = financeStore.sumProperty(objects, key);
        }
      }

    }

    const calculateVehicleCosts = (): void => {
      allVehicleCosts.value = summedProperties['summedNewVehiclesCost'] + summedProperties['summedVehicleLeasingCost']
          + summedProperties['summedSoldVehicles'] + summedProperties['summedVehicleRunningCost']
    };

    const calculateAnimals = (): void => {
      allAnimalCosts.value = summedProperties['summedNewAnimalsCost'] + summedProperties['summedSoldAnimals'];
    };

    const calculateConstruction = (): void => {
      allBuildingCosts.value = summedProperties['summedConstructionCost'] + summedProperties['summedSoldBuildings']
          + summedProperties['summedPropertyMaintenance'] + summedProperties['summedPropertyIncome'];
    }

    const calculateFields = (): void => {
      allFieldCosts.value = summedProperties['summedFieldPurchase'] + summedProperties['summedFieldSelling']
          + summedProperties['summedPurchaseSeeds'] + summedProperties['summedPurchaseFertilizer']
          + summedProperties['summedHarvestIncome']
    }

    const calculateSales = (): void => {
      allSales.value = summedProperties['summedSoldWood'] + summedProperties['summedSoldBales']
          + summedProperties['summedSoldWool'] + summedProperties['summedSoldMilk'] + summedProperties['summedSoldProducts']
    }

    const calculateOther = (): void => {
      allOtherCosts.value = summedProperties['summedPurchaseWater'] + summedProperties['summedIncomeBga']
          + summedProperties['summedMissionIncome'] + summedProperties['summedWagePayment']
          + summedProperties['summedLoanInterest'] + summedProperties['summedOther']
    }

    onMounted(() => {
      // call getData first to ensure finances are populated.
      financeStore.getData();

      // use watchEffect to run after the data has been requested.
      watchEffect(() => {
        calculateAll(financeStore.finances)
        calculateVehicleCosts()
        calculateAnimals()
        calculateConstruction()
        calculateFields()
        calculateSales()
        calculateOther()
      })
    })

    return { financeStore, summedProperties, allVehicleCosts, allAnimalCosts, allBuildingCosts, allFieldCosts,
      allSales, allOtherCosts }
  },

  computed: {
    Detail() {
      return Detail
    }
  },

  methods: {
    formatMoney(value: number | null): string {

      let formattedNumber = new Intl.NumberFormat('en-gb', {style: 'currency', currency: 'GBP'}).format(value ?? 0);

      if (value != null && value > 0) {
        return '+' + formattedNumber
      }

      return formattedNumber
    },

    isNegativeNumber(value: number | null): boolean {
      return value != null ? value < 0: false;
    }
  },

  data() {
    return {
      showPopup: false,
    }
  }
})
</script>

<template>
    <div class="finance">
      <finance-detail
          :detail="new Detail('Vehicle Costs', <number>allVehicleCosts, [
            {key: 'New', value: summedProperties['summedNewVehiclesCost']},
            {key: 'Sold', value: summedProperties['summedSoldVehicles']},
            {key: 'Leased', value: summedProperties['summedVehicleLeasingCost']},
            {key: 'Maintenance', value: summedProperties['summedVehicleRunningCost']}
          ])"
      ></finance-detail>
      <finance-detail
          :detail="new Detail('Animal Costs', <number>allAnimalCosts,
          [
            {key: 'New', value: summedProperties['summedNewAnimalsCost']},
            {key: 'Sold', value: summedProperties['summedSoldAnimals']}
          ])"
      ></finance-detail>
      <finance-detail
          :detail="new Detail('Sales', <number>allSales,
          [
            {key: 'Sold Wood', value: summedProperties['summedSoldWood']},
            {key: 'Sold Bales', value: summedProperties['summedSoldBales']},
            {key: 'Sold Wool', value: summedProperties['summedSoldWool']},
            {key: 'Sold Milk', value: summedProperties['summedSoldMilk']},
            {key: 'Sold Products', value: summedProperties['summedSoldProducts']},
          ])"></finance-detail>
      <finance-detail
          :detail="new Detail('Building Costs', <number>allBuildingCosts,
          [
            {key: 'New', value: summedProperties['summedConstructionCost']},
            {key: 'Sold', value: summedProperties['summedSoldBuildings']},
            {key: 'Maintenance', value: summedProperties['summedPropertyMaintenance']},
            {key: 'Income', value: summedProperties['summedPropertyIncome']}
          ])"></finance-detail>
      <finance-detail
          :detail="new Detail('Field Costs', <number>allFieldCosts,
          [
            {key: 'New', value: summedProperties['summedFieldPurchase']},
            {key: 'Sold', value: summedProperties['summedFieldsSelling']},
            {key: 'Seed Costs', value: summedProperties['summedPurchaseSeeds']},
            {key: 'Fert Costs', value: summedProperties['summedPurchaseFertilizer']},
            {key: 'Harvest Income', value: summedProperties['summedHarvestIncome']},
          ])"></finance-detail>
      <finance-detail
          :detail="new Detail('Other', <number>allOtherCosts,
          [
            {key: 'BGA Income', value: summedProperties['summedIncomeBga']},
            {key: 'Contracts', value: summedProperties['summedMissionIncome']},
            {key: 'Wages', value: summedProperties['summedWagePayment']},
            {key: 'Loan Interest', value: summedProperties['summedLoanInterest']},
            {key: 'Water', value: summedProperties['summedPurchaseWater']},
            {key: 'Other', value: summedProperties['summedOther']},
          ])"></finance-detail>
    </div>
</template>

<style scoped>
.finance {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
}
</style>