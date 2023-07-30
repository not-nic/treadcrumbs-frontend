import {defineStore} from "pinia";

export const useNoteStore = defineStore('noteStore', {
    state: () => ({
        showNoteCreator: false,
        isGeneratingNote: false,
        command: "",
        title: "",
        arguments: [],
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

        updateNoteText(newText: string): void {
            this.command = newText;
        },

        updateNoteTitle(newTitle: string): void {
            this.title = newTitle;
        },

        updateArguments(newArgs: [{}] ): void {
            this.arguments = newArgs;
        },

        createGeneratedNoteText(): void {
            let command: string = this.command;
            let args: Array = this.arguments;

            for (const arg of args) {
                for (const [key, value] of Object.entries(arg)) {
                    if (key !== 'type') {
                        const formattedArg: string = `${key}:${value}`
                        command = command.replace('@arg', formattedArg)
                    }
                }
            }

            console.log("creating new note:", command)
            this.command = command;
            this.hideGeneratingNote()
        },
    }
})