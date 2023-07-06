<template>
  <h1>TreadCrumbs</h1>
  <div class="elements" >
    <vehicles></vehicles>
    <career></career>
  </div>
</template>

<script>
import Vehicles from "../components/Vehicle/Vehicles.vue";
import Career from "../components/Career/Career.vue";
export default {
  name: "Dashboard",
  components: {Career, Vehicles}
}
</script>

<style scoped>
.elements {
  display: flex;
  gap: 15px;
}
</style>