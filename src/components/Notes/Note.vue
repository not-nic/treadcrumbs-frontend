<script lang="ts">
import {defineComponent} from 'vue'

export interface Note {
  id: Number
  author: String,
  contents: String,
  created: Date
}

export default defineComponent({
  name: "NoteComponent",

  props: {
    note: {} as Note
  }
})
</script>

<template>
  <div class="note">
    <div class="content">
      <p>{{note.contents}}</p>
    </div>
    <div class="info">
      <a>Info</a>
    </div>
  </div>
  <div v-for="(value, key) in note.additionalNoteData" :key="key" class="extra">
    {{key}} | {{value}}
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
}

.content {

}
</style>