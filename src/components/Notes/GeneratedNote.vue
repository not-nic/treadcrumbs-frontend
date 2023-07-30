<script lang="ts">
import {defineComponent} from 'vue'
import {useNoteStore} from "../../stores/NoteStore.ts";
import NoteArgument from "./NoteArgument.vue";


export default defineComponent({
  name: "GeneratedNote",

  components: {
    NoteArgument
  },

  props: {
    title: String,
    subtext: String,
    command: String,
    arguments: {} as object,
  },

  data() {
    return {
      noteStore: useNoteStore()
    }
  },

  methods: {
    updateText() {
      this.noteStore.showGeneratingNote();
      this.noteStore.updateArguments(this.arguments);
      this.noteStore.updateNoteText(this.command);
      this.noteStore.updateNoteTitle(this.title);
    },
  }
})
</script>

<template>
  <div @click="updateText" class="generated-note">
    <span>{{title}}</span>
    <span class="subtext">{{subtext}}</span>
  </div>
</template>

<style scoped>
  .generated-note {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;

    justify-content: center;
    align-items: center;
  }

  .generated-note:hover {
    background-color: #20252F;
  }

  .subtext {
    font-size: 14px;
  }
</style>