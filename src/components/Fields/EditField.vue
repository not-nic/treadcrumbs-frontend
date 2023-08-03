<script lang="ts">
import {defineComponent} from 'vue'
import {Field} from "./FieldTable.vue";
import axios from "axios";

export default defineComponent({
  name: "EditField",

  props: {
    field: {} as Field,
    creatingField: Boolean
  },

  methods: {
    async updateField(id?: number | undefined) {

      const URL: string = id !== undefined ? `api/fields/${id}` : 'api/fields';

      let field = this.field;

      try {
        const response = await axios.post(URL, {
          previousCrop: field.previousCrop,
          currentCrop: field.currentCrop,
          farmlandId: field.farmlandId,
          growthStage: field.growthStage,
          fieldSizeHa: field.fieldSizeHa,
          fertilized: field.fertilized,
          limed: field.limed,
          owned: field.owned,
          plowed: field.plowed,
          mulched: field.mulched,
          weeded: field.weeded
        })

        console.log(`Field ${id} updated:`, response.data);

        this.$emit("close")

      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<template>
  <div class="edit">
    <h2 v-if="!creatingField">Editing field {{field.id}}:</h2>
    <h2 v-else>Create New field</h2>
    <form onsubmit="return false">
      <div class="form-body">
        <div class="form-column">
          <div class="form-row">
            <label>Previous Crop:</label>
            <input v-model="field.previousCrop" type="text"  placeholder="E.g. Oats"/>
          </div>
          <div class="form-row">
            <label>Current Crop:</label>
            <input v-model="field.currentCrop" type="text" required placeholder="E.g. Barley"/>
          </div>
          <div class="form-row">
            <label>Farmland Id:</label>
            <input v-model="field.farmlandId" type="text" required placeholder="E.g. 13"/>
          </div>
          <div class="form-row">
            <label>Growth Stage:</label>
            <input v-model="field.growthStage" type="text" required placeholder="E.g. 1/5"/>
          </div>
          <div class="form-row">
            <label>Field Size:</label>
            <input v-model="field.fieldSizeHa" type="text" required placeholder="E.g. 14.5Ha"/>
          </div>
          <div class="form-row">
            <label>Fertilizer Level:</label>
            <input v-model="field.fertilized" type="text" required placeholder="E.g. 160kg/ha"/>
          </div>
          <div class="form-row">
            <label>Lime Level:</label>
            <input v-model="field.limed" type="text" required placeholder="E.g. 6.5000/ha"/>
          </div>
          <div class="form-row">
            <label>Ownership:</label>
            <select v-model="field.owned">
              <option>true</option>
              <option>false</option>
            </select>
          </div>
          <div class="form-row">
            <label>Plowed:</label>
            <select v-model="field.plowed">
              <option>true</option>
              <option>false</option>
            </select>
          </div>
          <div class="form-row">
            <label>Mulched:</label>
            <select v-model="field.mulched">
              <option>true</option>
              <option>false</option>
            </select>
          </div>
          <div class="form-row">
            <label>Weeded:</label>
            <select v-model="field.weeded">
              <option>true</option>
              <option>false</option>
            </select>
          </div>

          <input v-if="!creatingField"  @click="updateField(field.id)" class="submit" type="submit" value="Update Field">
          <input v-else @click="updateField()" class="submit" type="submit" value="Create Field">
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

.edit {
  width: 100%;
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
</style>