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
      <textarea @keyup="showNoteCreator" v-model="noteStore.command" minlength="5" placeholder="Type '/' to get started..."></textarea>
      <input class="submit" @click="noteStore.postRegularNote()" type="submit" value="Create"/>
    </div>
    <div v-if="noteStore.isGeneratingNote" class="command-container">
      <div  class="generated-command">
        <span @click="noteStore.hideGeneratingNote()" >{{noteStore.title}}</span>
        <div class="arguments"  v-for="arg in noteStore.arguments" :key="arg">
          <note-argument :argument="arg" :type="arg.type"></note-argument>
        </div>
      </div>
      <input class="submit" @click="noteStore.createGeneratedNoteText" type="submit" value="Create"/>
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
  color: #95A5BD;
}

textarea:focus {
  outline: none;
}

.generated-command, .normal-note, .command-container{
  display: flex;
  gap: 10px;
}

.submit {
  padding: 10px;
  font-family: 'Fira Code', monospace;
  background-color: #1b2029;
  border-radius: 10px;
  color: #5c6879;
  border: none;
  transition: all 0.5s;
}

.submit:hover {
  border: 1px solid #95A5BD;
  color: #95A5BD;
}

</style>