<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "EditVehicle",

  data() {
    return {
      name: "",
      posX: null as number | null,
      posY: null as number | null,
      posZ: null as number | null,
      propertyState: "",
      lastJob: "",
      age: null as number | null,
      price: null as number | null,
      operatingTime: null as number | null,
      wear: null as number | null,
      farmId: null as number | null,
      numberPlate: "",
      fuel: null as number | null,
      attachments: {
        type: Array as () => number[],
        default: () => []
      },

      implements: [] as any[],
      frontImplement: null as number | null,
      backImplement: null as number | null

    }
  },

  props: {
    vehicleId: Number,
    isCreatingVehicle: Boolean
  },

  mounted() {
    this.getImplementData()
  },

  watch: {
    vehicleId: {
      immediate: true,
      handler(newVal: number | undefined) {
        this.getEditingVehicleData(newVal)
      }
    },

    isCreatingVehicle: {
      immediate: true,
      handler() {
        this.name = this.propertyState = this.lastJob = this.numberPlate = ""
        this.posX = this.posY = this.posZ = this.wear = this.fuel = this.operatingTime = null;
        this.frontImplement = this.backImplement = null;
      }
    }
  },

  methods: {
    close(): void {
      this.$emit("close")
    },

    async getEditingVehicleData(id: number | undefined) {
      try {
        const response = await axios.get(`api/tractors/${id}`)
        let vehicle = response.data;

        this.name = vehicle.name;
        this.posX = vehicle.position.x;
        this.posY = vehicle.position.y;
        this.posZ = vehicle.position.z;
        this.propertyState = vehicle.propertyState;
        this.lastJob = vehicle.aiLastJob;
        this.age = vehicle.age;
        this.price = vehicle.price;
        this.operatingTime = vehicle.operatingTime;
        this.wear = vehicle.damage;
        this.farmId = vehicle.farmId;
        this.numberPlate = vehicle.licencePlate;
        this.fuel = vehicle.fuel;
        this.frontImplement = vehicle.attachment.attachmentIds[0];
        this.backImplement = vehicle.attachment.attachmentIds[1];

      }
      catch (error) {
        console.error("Error getting information for vehicle with Id: ", id)
      }
    },

    async getImplementData() {
      try {
        const response = await axios.get('api/implements');
        const responseData = response.data;

        this.implements = responseData.map((item: any) => ({
          id: item.id,
          name: item.name
        }));

      } catch (error) {
        console.error("Error getting implement data: ", error)
      }
    },

    async updateVehicleById(id?: number | undefined) {

      const url: string = this.isCreatingVehicle ? `api/tractors/` : `api/tractors/${id}`

      const attachments: {attachmentIds: number[] } = {
        attachmentIds: []
      }

      if ( this.frontImplement!== null ) {
        attachments.attachmentIds.push(this.frontImplement)
      }

      if ( this.backImplement!== null ) {
        attachments.attachmentIds.push(this.backImplement)
      }

      try {
        const response = await axios.post(url, {
          name: this.name,
          propertyState: this.propertyState,
          age: this.age,
          price: this.price,
          operatingTime: this.operatingTime,
          damage: this.wear,
          farmId: this.farmId,
          position: {x: this.posX, y: this.posY, z: this.posZ},
          licencePlate: this.numberPlate,
          aiLastJob: this.lastJob,
          fuel: this.fuel,
          attachment: attachments
        });

        this.close();

        console.log(`Vehicle ${id} updated:`, response.data);

      } catch (error) {
        console.error(`Error updating vehicle ${id}:`, error);
      }
    },

    async createVehicle() {
      try {

        const attachments: {attachmentIds: number[] } = {
          attachmentIds: []
        }

        if ( this.frontImplement!== null ) {
          attachments.attachmentIds.push(this.frontImplement)
        }

        if ( this.backImplement!== null ) {
          attachments.attachmentIds.push(this.backImplement)
        }

        const response = await axios.post(`api/tractors/`, {
          name: this.name,
          propertyState: this.propertyState,
          age: this.age,
          price: this.price,
          operatingTime: this.operatingTime,
          damage: this.wear,
          farmId: this.farmId,
          position: {x: this.posX, y: this.posY, z: this.posZ},
          licencePlate: this.numberPlate,
          aiLastJob: this.lastJob,
          fuel: this.fuel,
          attachment: attachments
        });

        this.close();

        console.log('Vehicle Created: ', response.data);

      } catch (error) {
        console.error('Error creating vehicle', error)
      }
    }
  }
})
</script>

<template>
  <div class="mask">
    <div class="box">
      <div class="container">
        <div class="header">
          <h2 v-if="isCreatingVehicle">New Vehicle Information</h2>
          <h2 v-else>Vehicle Information</h2>
          <svg @click="close()" class="close" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.73077 14.4231C1.41214 14.7417 0.895549 14.7417 0.576923 14.4231C0.258297 14.1045 0.258297 13.5879 0.576923 13.2692L4.93194 8.91421C5.71299 8.13316 5.71299 6.86684 4.93194 6.08579L0.576923 1.73077C0.258297 1.41214 0.258297 0.895549 0.576923 0.576923C0.895549 0.258297 1.41214 0.258297 1.73077 0.576923L6.08579 4.93194C6.86684 5.71299 8.13317 5.71299 8.91421 4.93194L13.2692 0.576923C13.5879 0.258297 14.1045 0.258297 14.4231 0.576923C14.7417 0.895549 14.7417 1.41214 14.4231 1.73077L10.0681 6.08579C9.28701 6.86684 9.28701 8.13317 10.0681 8.91421L14.4231 13.2692C14.7417 13.5879 14.7417 14.1045 14.4231 14.4231C14.1045 14.7417 13.5879 14.7417 13.2692 14.4231L8.91421 10.0681C8.13316 9.28701 6.86684 9.28701 6.08579 10.0681L1.73077 14.4231Z" fill="#B2C5E1"/>
          </svg>
        </div>
        <div class="content">
          <form onsubmit="return false">
            <div class="form-body">
              <div class="form-column">
                <div class="form-row">
                  <label>Vehicle Name:</label>
                  <input v-model="name" type="text" placeholder="e.g. John Deere 6R"/>
                </div>
                <div class="form-row">
                  <label>Last Job:</label>
                  <input v-model="lastJob" placeholder="e.g. Sowing" type="text"/>
                </div>
                <div class="form-row">
                  <label>Number Plate:</label>
                  <input v-model="numberPlate" placeholder="e.g. GK23 FLP" type="text"/>
                </div>
                <div class="form-row">
                  <label>Position: (x, y, z)</label>
                  <div class="pos">
                    <input v-model="posX" class="small" placeholder="69.69" type="text"/>
                    <input v-model="posY" class="small" placeholder="69.69" type="text"/>
                    <input v-model="posZ" class="small" placeholder="69.69" type="text"/>
                  </div>
                </div>
                <div class="additional">
                  <div class="form-row">
                    <label>Wear:</label>
                    <input v-model="wear" placeholder="0.459" class="small" type="text"/>
                  </div>
                  <div class="form-row">
                    <label>Fuel:</label>
                    <input v-model="fuel" placeholder="0.912" class="small" type="text"/>
                  </div>
                  <div class="form-row">
                    <label>Work Hours:</label>
                    <input v-model="operatingTime" placeholder="49" class="small" type="text"/>
                  </div>
                </div>
                <div class="attachment">
                  <div class="form-row">
                    <label>Front Attachment:</label>
                    <select class="med" v-model="frontImplement" @click="">
                      <option disabled value="">Select front implement.</option>
                      <option :value="null">none</option>
                      <option v-for="implement in implements" :key="implement.id" :value="implement.id">{{implement.name}}</option>
                    </select>
                  </div>
                  <div class="form-row">
                    <label>Back Attachment:</label>
                    <select class="med" v-model="backImplement">
                      <option disabled value="">Select back implement.</option>
                      <option :value="null">none</option>
                      <option v-for="implement in implements" :key="implement.id" :value="implement.id">{{implement.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <label>Ownership:</label>
                  <select v-model="propertyState">
                    <option>owned</option>
                    <option>leased</option>
                  </select>
                </div>
              </div>
              <div class="edit">
                <label>Vehicle Image:</label>
                <img src="../../assets/icon.png" alt="tractor icon">
                <button>edit picture</button>
              </div>
            </div>

            <input v-if="isCreatingVehicle" @click="createVehicle()" class="submit" type="submit" value="Create Vehicle">
            <input v-else @click="updateVehicleById(vehicleId)" class="submit" type="submit" value="Save Changes">
          </form>
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
  background: #212833;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
  width: 720px;
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

  width: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

form {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
}

.edit {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px 0 0 0;
  text-align: start;
  flex-grow: 0;
}

.form-column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  text-align: start;
  padding: 15px 0 0 0;
  width: 100%;

  justify-content: space-between;
  gap: 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pos, .additional, .attachment {
  display: flex;
  justify-content: space-between;
}

.small {
  max-width: 130px;
}

.med {
  max-width: 210px;
}

label {
  padding-left: 10px;
  font-family: 'Overpass', sans-serif;
  color: #B2C5E1;
}

input, button, select, option {
  border-radius: 8px;
  border: 2px solid #232f41;
  background: #1b2029;
  padding: 15px 10px 15px 15px;

  font-family: 'Fira Code', monospace;
  color: #636E7E;
}

input:focus {
  border: 2px solid #B2C5E1;
  background: #242a34;
  outline: none;
  color: #95A5BD;
}

.submit:hover, button:hover {
  border: 2px solid #B2C5E1;
  background: #242a34;
  outline: none;
  color: #95A5BD;
}

img {
  max-width: 200px;
  border: 2px solid #232f41;
  border-radius: 8px;
  background: linear-gradient(0deg, rgb(27, 32, 41) 0%, rgb(27, 32, 41) 100%);
}

button {
  width: 200px;
}

</style>