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
    <h3>Generate Notes</h3>
    <div class="generated-notes">
      <generated-note :url="'/fieldwork'"
                      :title="'/Seed'"
                      :subtext="'use this command to remind you to seed your next field.'"
                      :arguments="[
                        {field: 0, type: 'number'},
                        {crop: '', type: 'text'},
                        {vehicle: 0, type: 'number'}
                    ]"
                      :command="`/Seed @arg with @arg using @arg`"
      ></generated-note>
      <generated-note :url="'/fieldwork'"
                      :title="'/Plant'"
                      :subtext="'use this command to remind you to plant your next field.'"
                      :arguments="[
                        {field: 0, type: 'number'},
                        {crop: '', type: 'text'},
                        {vehicle: 0, type: 'number'}
                    ]"
                      :command="`/Plant @arg with @arg using @arg`"
      ></generated-note>
      <generated-note :url="'/fieldwork'"
                      :title="'/Cultivate'"
                      :subtext="'use this command for cultivating fields.'"
                      :arguments="[
                        {field: 0, type: 'number'},
                        {vehicle: 0, type: 'number'}
                    ]"
                      :command="`/Cultivate @arg using @arg`"
      ></generated-note>
      <generated-note :url="'/fieldwork'"
                      :title="'/Plow'"
                      :subtext="'use this command for plowing fields.'"
                      :arguments="[
                        {field: 0, type: 'number'},
                        {vehicle: 0, type: 'number'}
                    ]"
                      :command="`/Plow @arg using @arg`"
      ></generated-note>
      <generated-note :url="'/fieldwork'"
                      :title="'/Mulch'"
                      :subtext="'use this command for mulching fields.'"
                      :arguments="[
                        {field: 0, type: 'number'},
                        {vehicle: 0, type: 'number'}
                    ]"
                      :command="`/Mulch @arg using @arg`"
      ></generated-note>
      <generated-note :url="'/fieldwork'"
                      :title="'/Rolling'"
                      :subtext="'use this command for rolling fields.'"
                      :arguments="[
                        {field: 0, type: 'number'},
                        {vehicle: 0, type: 'number'}
                    ]"
                      :command="`/Rolling @arg using @arg`"
      ></generated-note>
    </div>
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
  padding: 20px;
  overflow: auto;
}

h3 {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: rgba(178, 197, 225, 1);
  text-align: start;
  padding-bottom: 15px;
}

.generated-notes {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>