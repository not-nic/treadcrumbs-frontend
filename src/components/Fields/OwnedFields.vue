<script lang="ts">
import {defineComponent} from 'vue'
import {Field} from "./FieldTable.vue";
import EditField from "./EditField.vue";

export default defineComponent({
  name: "FieldDropdown",
  components: {EditField},

  props: {
    field: {} as Field,
  },

  data() {
    return {

    }
  },

  methods: {
    booleanToText(value: boolean): string {
      return value ? "Yes" : "No";
    },

    sendField(field: Field): void {
      this.$emit("field", field)
    }
  }
})
</script>

<template>
  <div @click="sendField(field)" class="field">
    <div class="field-info">
      <h3>Field {{field.farmlandId}}</h3>
      <h3 class="ha">[{{ (field.fieldSizeHa / 10000).toFixed(2) }}Ha]</h3>
    </div>
    <div class="field-content">
      <div class="field-column">
        <div class="field-stat">
          <span>Growth Stage:</span>
          <span>{{field.growthStage}}</span>
        </div>
        <div class="field-stat">
          <span>Fertilizer Level:</span>
          <span>{{field.fertilized}}</span>
        </div>
        <div class="field-stat">
          <span>Lime Level:</span>
          <span>{{field.limed}}</span>
        </div>
      </div>
      <div class="field-column">
        <div class="field-stat">
          <span>Weeded:</span>
          <span>{{booleanToText(field.weeded)}}</span>
        </div>
        <div class="field-stat">
          <span>Plowed:</span>
          <span>{{booleanToText(field.plowed)}}</span>
        </div>
        <div class="field-stat">
          <span>Mulched:</span>
          <span>{{booleanToText(field.mulched)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

span {
  font-family: 'Overpass', sans-serif;
  color: rgba(178, 197, 225, 0.8);
}

.field-info {
  display: flex;
  gap: 20px;
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

.field-content {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.field-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field-stat {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
</style>