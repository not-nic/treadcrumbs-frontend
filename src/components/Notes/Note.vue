<script lang="ts">
import {defineComponent} from 'vue'
import {useNoteStore} from "../../stores/NoteStore.ts";
import {crops} from "../../ts/Crops.ts";

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

  computed: {
    modifiedNoteContents(): string {
      return this.replaceCropColorInNote(this.note.contents)
    }
  },

  methods: {
    isEmpty(additionalNoteData: Object) {
      return additionalNoteData && Object.keys(additionalNoteData).length > 0;
    },

    replaceCropColorInNote(contents: string): string {
      const cropRegex = /\[([^\]]+)\]/g;
      return contents.replace(cropRegex, (match, cropName) => {
        const crop = crops.find((c) => c.name.toLowerCase() === cropName.toLowerCase());

        if (crop) {
          return `<span style="color: ${crop.colour}; display: flex; flex-direction: row; align-items: center">[<img src="src/assets/crops/${crop.filepath}" alt="crop icon" width="20px"/> ${cropName}]</span>`
        } else {
          return match
        }
      });
    }
  }

})
</script>

<template>
  <div class="note">
    <div class="content">
      <p v-html="modifiedNoteContents"></p>
    </div>
    <div class="info">
      <a @click="noteStore.displayNoteInfo(note.id)" v-if="isEmpty(note.additionalNoteData)">Info</a>
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
  text-align: start;
  display: flex;
  gap: 5px;
}

.note {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px 10px 5px;
  font-family: 'Overpass', sans-serif;
  color: rgba(178, 197, 225, 0.9);
  border-radius: 8px;
  gap: 10px;
}

.note:hover {
  background-color: rgba(178, 197, 225, 0.1);
}

a {
  font-weight: 300;
  padding-right: 10px;
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

.key {
  font-family: 'Overpass', sans-serif;
  color: #76879b;
  padding: 0;
  font-size: 16px;
}

.value {
  font-family: 'Fira Code', monospace;
  font-weight: 300;
  color: #B36A2E;
  padding: 5px;
  font-size: 16px;
}
</style>