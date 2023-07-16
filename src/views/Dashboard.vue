<template>
  <div class="elements">
    <div class="top">
      <vehicles></vehicles>
      <fields></fields>
      <career></career>
    </div>
    <div class="bottom">
      <Map></Map>
      <Note></Note>
    </div>
  </div>
</template>

<script>
import Vehicles from "../components/Vehicle/Vehicles.vue";
import Career from "../components/Career/Career.vue";
import Fields from "../components/Fields/Fields.vue";
import Map from "../components/Map/Map.vue";
import Note from "../components/Notes/Note.vue"
export default {
  name: "Dashboard",
  components: {Fields, Career, Vehicles, Map, Note}
}
</script>

<style scoped>
.elements {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.top {
  display: flex;
  gap: 15px;
}

.bottom {
  display: flex;
  gap: 15px
}
</style>