<script lang="ts">
import {defineComponent} from 'vue'
import {useNoteStore} from "../../stores/NoteStore.ts";

interface Argument {
  [key: string]: any;
}

export default defineComponent({
  name: "NoteArgument",
  data() {
    return {
      noteStore: useNoteStore(),
      data: ""
    }
  },

  methods: {
    addData() {
      const key = Object.keys(this.argument)[0];
      const value = this.data;

      const index = this.noteStore.arguments.findIndex((item: { [key: string]: any }) => Object.keys(item)[0] === key);

      if (index !== -1) {
        this.noteStore.arguments[index][key] = value;
      } else {
        this.noteStore.arguments.push({[key]: value});
      }
    }
  },

  props: {
    argument: {
      type: Object,
      required: true
    },

    type: {
      type: String,
      required: true,
      default: "text"
    }
  }
})
</script>

<template>
  <div class="argument">
    <label>{{ Object.keys(argument)[0] }}:</label>
    <input @keyup="addData" v-model="data" :type="type"/>
  </div>
</template>

<style scoped>
  .argument {
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 5px;
  }

  label {
    color: #76879b;
  }

  input {
    width: 100%;
    padding: 2px;
    border-radius: 4px;
    border: none;
  }

  input:focus {
    outline: none;
    border: 2px solid #95A5BD;
  }
</style>