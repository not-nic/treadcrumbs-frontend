<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
import NoteComponent, {Note} from "./Note.vue";
import CreateNote from "./CreateNote.vue";
import GeneratedNoteCreator from "./GeneratedNoteCreator.vue";

export default defineComponent({
  name: "Notes",
  components: {GeneratedNoteCreator, CreateNote, NoteComponent},

  data() {
    return {
      notes: {} as Note
    }
  },

  mounted() {
    this.getNotes()
  },

  methods: {
    async getNotes() {
      try {
        const response = await axios.get('api/notes')
        this.notes = response.data;

        console.log(this.notes)
      } catch (error) {
        console.error("Error getting notes", error)
      }
    }
  }
})
</script>

<template>
<div class="container">
  <div class="note-element">
    <div class="header">
      <h2>Notes</h2>
    </div>
    <div class="notes">
      <note-component v-for="note in notes" :key="note.id" :note="note"></note-component>
    </div>
    <generated-note-creator></generated-note-creator>
    <create-note></create-note>
  </div>
</div>
</template>

<style scoped>
.container {
  width: 660px;
  padding: 15px;
  background-color: #212833;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;
}

.note-element {
  background: rgba(0, 0, 0, 0.10);
  padding: 20px;
  height: 100%;
  overflow: auto;
  border: 2px solid rgba(89, 89, 89, 0.30);
  border-radius: 15px;

  position: relative;

  display: flex;
  flex-direction: column;
  gap: 5px;
}

.notes {
  flex: 1;
  overflow: auto;
}
</style>