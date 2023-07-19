<script lang="ts">
import {defineComponent} from 'vue'
import {Field} from "./FieldTable.vue";
import axios from "axios";
import OwnedFields from "./OwnedFields.vue";
import EditField from "./EditField.vue";

export default defineComponent({
  name: "selectField",
  components: {EditField, OwnedFields},

  data() {
    return {
      ownedFields: [] as Field[],
      currentField: {} as Field | null,
      displayFields: true,

      newField: {} as Field
    }
  },

  mounted() {
    this.getOwnedFields()
  },

  methods: {
    close(): void {
      this.$emit("close")
      this.displayFields = true
    },

    async getOwnedFields() {
      try {
        const response = await axios.get('api/fields/owned');
        this.ownedFields = response.data;

      } catch (error) {
        console.error(error)
      }
    },

    setId(field: Field): void {
      this.currentField = field;
      this.displayFields = false;
    }
  }
})
</script>

<template>
  <div class="mask">
    <div class="box">
      <div class="container">
        <div class="header">
          <h2>Update Fields</h2>
          <svg @click="close()" class="close" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.73077 14.4231C1.41214 14.7417 0.895549 14.7417 0.576923 14.4231C0.258297 14.1045 0.258297 13.5879 0.576923 13.2692L4.93194 8.91421C5.71299 8.13316 5.71299 6.86684 4.93194 6.08579L0.576923 1.73077C0.258297 1.41214 0.258297 0.895549 0.576923 0.576923C0.895549 0.258297 1.41214 0.258297 1.73077 0.576923L6.08579 4.93194C6.86684 5.71299 8.13317 5.71299 8.91421 4.93194L13.2692 0.576923C13.5879 0.258297 14.1045 0.258297 14.4231 0.576923C14.7417 0.895549 14.7417 1.41214 14.4231 1.73077L10.0681 6.08579C9.28701 6.86684 9.28701 8.13317 10.0681 8.91421L14.4231 13.2692C14.7417 13.5879 14.7417 14.1045 14.4231 14.4231C14.1045 14.7417 13.5879 14.7417 13.2692 14.4231L8.91421 10.0681C8.13316 9.28701 6.86684 9.28701 6.08579 10.0681L1.73077 14.4231Z" fill="#B2C5E1"/>
          </svg>
        </div>
        <div class="content">
          <div class="owned-fields">
            <span v-show="displayFields">Select from owned fields:</span>
          </div>
          <owned-fields v-show="displayFields" @field="setId"  v-for="field in ownedFields" :key="field.id" :field="field"></owned-fields>
          <edit-field v-show="!displayFields" :creating-field="false" :field="currentField"></edit-field>
          <edit-field v-show="displayFields" :creating-field="true" :field="newField"></edit-field>
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
  width: 720px;
  height: 800px;
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
  height: 100%;
  overflow: auto;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.close {
  max-width: 28px;
  padding: 5px;
}

.close:hover {
  fill-opacity: 0.5;
}

.owned-fields {
  padding-top: 20px;
}

h3 {
  margin: 0;
  color: rgba(178, 197, 225, 1);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

.owned-fields {
  display: flex;
}

span {
  font-family: 'Overpass', sans-serif;
  font-weight: 300;
  color: rgba(178, 197, 225, 0.8);
}

</style>