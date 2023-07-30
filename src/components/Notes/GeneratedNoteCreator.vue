<script lang="ts">
import {defineComponent} from 'vue'
import {useNoteStore} from "../../stores/NoteStore.ts";
import GeneratedNote from "./GeneratedNote.vue";
import NoteArgument from "./NoteArgument.vue";

export default defineComponent({
  name: "GeneratedNoteCreator",
  components: {GeneratedNote, NoteArgument},

  data() {
    return {
      noteStore: useNoteStore()
    }
  }
})
</script>

<template>
  <div class="note-creator" v-show="noteStore.showNoteCreator">
    <h4>Generate Notes</h4>
    <generated-note :title="'/seed'"
                    :subtext="'use this command to remind you to plant your next field.'"
                    :arguments="[
                        {field: 0, type: 'number'},
                        {crop: '', type: 'text'},
                        {vehicle: 0, type: 'number'}
                    ]"
                    :command="`/seed @arg with @arg using @arg`"
    ></generated-note>
  </div>
</template>

<style scoped>
.note-creator {
  background-color: #1b2029;
  width: calc(100% - 40px);
  height: 300px;
  top: 345px;
  z-index: 2;
  position: absolute;
  border-radius: 10px;
}

h4 {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: #95a5bd;
  text-align: start;
  padding: 15px;
}
</style>