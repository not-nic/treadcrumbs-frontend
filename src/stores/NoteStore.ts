import {defineStore} from "pinia";
import axios from "axios";
import {Note} from "../components/Notes/Note.vue";
import {crops} from "../ts/Crops.ts";

export const useNoteStore = defineStore('noteStore', {
    state: () => ({
        notes: {} as Note,

        showNoteCreator: false,
        isGeneratingNote: false,

        showNoteInfo: false,
        currentNoteId: null as number | null,

        title: "",
        command: "",
        url: "",
        arguments: [],
        noteInfo: {},
    }),

    actions: {
        openNoteCreator(): void {
            this.showNoteCreator = true;
        },

        closeNoteCreator(): void {
            this.showNoteCreator = false
        },

        showGeneratingNote(): void {
            this.isGeneratingNote = true;
        },

        hideGeneratingNote(): void {
            this.isGeneratingNote = false;
        },

        displayNoteInfo(noteId: number): void {
            if (this.currentNoteId === noteId) {
                this.showNoteInfo = false;
                this.currentNoteId = null;
            } else {
                this.showNoteInfo = true;
                this.currentNoteId = noteId;
            }
        },

        updateNoteText(newText: string): void {
            this.command = newText;
        },

        updateNoteUrl(url: string): void {
            this.url = url;
        },

        updateNoteTitle(title: string): void {
            this.title = title;
        },

        updateArguments(newArgs: [{}] ): void {
            this.arguments = newArgs;
        },

        seedCosts(cropName: string): void{
            const crop = crops.find(c => c.name === cropName);
            let currentCrop = crop ? crop.name : null

            if (currentCrop != null && crop) {
                this.noteInfo["seedsPerHa"] = crop.seedsPerHa
                this.noteInfo["fieldId"] = Object.values(this.arguments[0])[0];

                console.log(this.noteInfo)
            } else {
                console.error(`${cropName} is not a valid crop.`)
            }
        },

        calculateFertilizerCosts(){

        },

        createGeneratedNoteText(): void {
            let command: string = this.command;
            let args: Array<any> = this.arguments;

            // for each argument object defined in the command
            for (const arg of args) {

                // get the key and value from the object
                for (const [key, value] of Object.entries(arg)) {

                    // make sure we don't loop over the argument type i.e. number, text etc
                    if (key !== 'type') {
                        // replace any @arg in the command with the key value pair.
                        const formattedArg: string = `${key}:${value}`
                        command = command.replace('@arg', formattedArg)
                    }

                    // check if the key is a crop, then create the seed costs for that crop.
                    if (key == 'crop') {
                        if (typeof value === "string") {
                            this.seedCosts(value)
                        }
                    }
                }
            }

            // set current command to string.
            this.command = command;

            // post note to database.
            this.postGeneratedNote()
        },

        async postGeneratedNote() {
            try {
                const response = await axios.post(`/api/notes${this.url}`, {
                    author: "nick",
                    contents: this.command,
                    generated: true,
                    additionalNoteData: this.noteInfo
                });

                console.log(response)

                // reset command to an empty string
                // this.command = "";
                // hide the generated note menu.
                this.hideGeneratingNote();
                this.closeNoteCreator();

            } catch (error) {
                console.error("Failed to create note:", error)
            }
        }
    }
})