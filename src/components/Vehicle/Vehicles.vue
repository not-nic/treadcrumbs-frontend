<template>

  <EditVehicle  @close="isEditingVehicle=false; isCreatingVehicle=false; getData()" v-show="isEditingVehicle"
                :vehicle-id="selectedVehicleId"
                :is-creating-vehicle="isCreatingVehicle">
  </EditVehicle>

  <div class="container">
    <div class="vehicles">
      <div class="dashboard-element">
        <h2>Vehicle Maintenance</h2>
        <div class="buttons">
          <svg @click="isEditingVehicle = true; isCreatingVehicle = true" class="add" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20C9.40827 20 8.92857 19.5203 8.92857 18.9286V13.0714C8.92857 11.9669 8.03314 11.0714 6.92857 11.0714H1.07143C0.479696 11.0714 0 10.5917 0 10V10C0 9.40827 0.479695 8.92857 1.07143 8.92857H6.92857C8.03314 8.92857 8.92857 8.03314 8.92857 6.92857V1.07143C8.92857 0.479696 9.40827 0 10 0V0C10.5917 0 11.0714 0.479695 11.0714 1.07143V6.92857C11.0714 8.03314 11.9669 8.92857 13.0714 8.92857H18.9286C19.5203 8.92857 20 9.40827 20 10V10C20 10.5917 19.5203 11.0714 18.9286 11.0714H13.0714C11.9669 11.0714 11.0714 11.9669 11.0714 13.0714V18.9286C11.0714 19.5203 10.5917 20 10 20V20Z" fill="#B2C5E1"/>
          </svg>
          <svg @click="getData()" class="refresh" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20C7.22917 20 4.86979 19.026 2.92188 17.0781C0.973959 15.1302 0 12.7708 0 10C0 7.22917 0.973959 4.86979 2.92188 2.92188C4.86979 0.973959 7.22917 0 10 0C11.7708 0 13.3229 0.359375 14.6563 1.07813C15.1538 1.34633 15.6267 1.65153 16.0749 1.99371C16.8304 2.57042 18.125 2.08344 18.125 1.13302V0.9375C18.125 0.419733 18.5447 0 19.0625 0V0C19.5803 0 20 0.419733 20 0.9375V6.9375C20 7.48979 19.5523 7.9375 19 7.9375H13C12.4822 7.9375 12.0625 7.51777 12.0625 7V7C12.0625 6.48223 12.4822 6.0625 13 6.0625H15.4955C16.2836 6.0625 16.7435 5.20102 16.2075 4.62323C15.6398 4.01119 14.9977 3.48052 14.2813 3.03125C13.0521 2.26042 11.625 1.875 10 1.875C7.72917 1.875 5.80729 2.66146 4.23437 4.23437C2.66146 5.80729 1.875 7.72917 1.875 10C1.875 12.2708 2.66146 14.1927 4.23437 15.7656C5.80729 17.3385 7.72917 18.125 10 18.125C11.7292 18.125 13.3125 17.6302 14.75 16.6406C15.9956 15.7832 16.9127 14.6872 17.5013 13.3527C17.6658 12.9797 18.0234 12.7188 18.4311 12.7188V12.7188C19.063 12.7188 19.5224 13.3227 19.2836 13.9077C18.6117 15.5534 17.5484 16.9174 16.0938 18C14.3021 19.3333 12.2708 20 10 20Z" fill="#B2C5E1"/>
          </svg>
        </div>
      </div>
      <div class="vehicle" v-for="vehicle in vehicles" :key="vehicle.id">
        <vehicle-entry @Open="editingVehicle"
                       :id="vehicle.id"
                       :name="vehicle.name"
                       :position="new Coordinate(vehicle.position.x, vehicle.position.y, vehicle.position.z)"
                       :last-job="vehicle.aiLastJob"
                       :property-state="vehicle.propertyState"
                       :age="vehicle.age"
                       :price="vehicle.price"
                       :operating-time="vehicle.operatingTime"
                       :wear="vehicle.damage"
                       :farm-id="vehicle.farmId"
                       :number-plate="vehicle.licencePlate"
                       :fuel="vehicle.fuel"
                       :attachment="vehicle.attachment.attachmentIds"
        ></vehicle-entry>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import  axios from "axios";
import VehicleEntry from "./VehicleEntry.vue";
import { Coordinate } from "../../ts/Coordinate.ts";
import EditVehicle from "./EditVehicle.vue";

export default defineComponent({
  name: "Vehicles",

  computed: {
    Coordinate() {
      return Coordinate
    }
  },

  components: {
    EditVehicle,
    VehicleEntry
  },

  data() {
    return {
      vehicles: [] as any[],
      isEditingVehicle: false,
      isCreatingVehicle: false,
      selectedVehicleId: 1
    }
  },

  mounted() {
    this.getData();
  },

  methods: {

    editingVehicle(vehicleId: number): void {
      this.isEditingVehicle = true;
      this.selectedVehicleId = vehicleId;

      // debug print
      // console.log("clicked on vehicle: ", vehicleId)
    },

    async getData() {
      try {
        const response = await axios.get('api/tractors');
        this.vehicles = response.data;

      } catch (error) {
        console.error(error)
      }
    },
  }

})
</script>

<style scoped>

.dashboard-element {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.vehicle {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 5px;
}

.container {
  width: 720px;
  padding: 15px;
  background-color: #212833;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
}

.vehicles {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: rgba(0, 0, 0, 0.10);
  padding: 20px;
  max-height: 400px;
  width: 100%;
  overflow: auto;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
}
</style>