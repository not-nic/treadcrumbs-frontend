<script lang="ts">
import {defineComponent} from 'vue'
import {useNoteStore} from "../../stores/NoteStore.ts";

export interface Note {
  id: Number
  author: String,
  contents: String,
  generated: Boolean,
  created: Date,
  additionalNoteData: {}
}

export default defineComponent({
  name: "NoteComponent",

  props: {
    note: {} as Note
  },

  data() {
    return {
      noteStore: useNoteStore()
    }
  },

})
</script>

<template>
  <div class="note">
    <div class="content">
      <p>{{note.contents}}</p>
    </div>
    <div class="info">
      <a @click="noteStore.displayNoteInfo(note.id)">Info</a>
    </div>
  </div>
  <div v-show="noteStore.showNoteInfo && noteStore.currentNoteId === note.id" v-for="(value, key) in note.additionalNoteData" :key="key" class="extra">
    <span class="key">{{key}}:</span>
    <span class="value">{{value}}</span>
  </div>
</template>

<style scoped>

p {
  margin: 0;
  padding: 0;
}

.note {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px 10px 5px;
  font-family: 'Overpass', sans-serif;
  color: rgba(178, 197, 225, 0.9);
}

a {
  font-weight: 300;
}

.content {
  padding-left: 10px;
}

.extra {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: first baseline;
  padding-left: 30px;
}

.value {
  color: #B36A2E;
}
</style>