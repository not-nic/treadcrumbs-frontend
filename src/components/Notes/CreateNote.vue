<script lang="ts">
import {defineComponent} from 'vue'
import {useNoteStore} from "../../stores/NoteStore.ts";
import GeneratedNoteCreator from "./GeneratedNoteCreator.vue";
import NoteArgument from "./NoteArgument.vue";

export default defineComponent({
  name: "CreateNote",
  components: {NoteArgument, GeneratedNoteCreator},

  data() {
    return {
      noteCreator: false,
      noteStore: useNoteStore(),
    }
  },

  methods: {
    showNoteCreator() {
      let currentCommand = this.noteStore.command;

      if (currentCommand.charAt(0) == '/') {
        this.noteStore.openNoteCreator();
      }

      if (currentCommand == "") {
        this.noteStore.closeNoteCreator();
      }
    }
  }
})
</script>

<template>
  <div class="create">
    <div v-if="!noteStore.isGeneratingNote" class="normal-note">
      <textarea @keyup="showNoteCreator" v-model="noteStore.command" placeholder="Type '/' to get started..."></textarea>
      <input type="submit" value="submit"/>
    </div>
    <div v-if="noteStore.isGeneratingNote" class="generated-command">
      <span @click="noteStore.hideGeneratingNote()" >{{noteStore.title}}</span>
      <div class="arguments"  v-for="arg in noteStore.arguments" :key="arg">
        <note-argument :argument="arg" :type="arg.type"></note-argument>
      </div>
      <input @click="noteStore.createGeneratedNoteText" type="submit" value="submit"/>
    </div>
  </div>
</template>

<style scoped>
textarea, .generated-command {
  width: 100%;
  height: 44px;
  resize: none;
  background-color: #1b2029;
  border: none;
  border-radius: 10px;
  padding: 10px;

  font-family: 'Fira Code', monospace;
}

textarea:focus {
  outline: none;
}

.generated-command, .normal-note{
  display: flex;
  gap: 10px;
}
</style>