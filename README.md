# What is this?
This is the frontend for my final university project. It is a analysis and companion web application for Farming Simulator 22. 
It works by uploading a Farming Simulator 22 save game which is read and displayed to the user using SpringBoot. (The SpringBoot backend can be found [here](https://github.com/not-nic/treadcrumbs).)

![Dashboard](https://i.imgur.com/2Ljt9oD.png)

Once the contents of the save game are read, it will be shown back to the user through this frontend - showing the user how they can improve the efficiency of their virtual farm.\
The main features are:
- Fields: This shows all the stats about a players field and how their yields can be improved.
- Notes: This allows either users to type plaintext to remind them of something to do, or a discord-esque slash command system to quickly generate repetitive notes.
- Vehicles: This shows all the vehicles and attachments within the save game, alongside their fuel level, durability and last job, so a user can check their state without entering them in game.
- Finances: This shows all data taken about the save game about the user's finances - allowing them to add money by selling crops & goods and removing money by buying vehicles and fields.
- Map: This part remains mostly unfinished due to time constraints (but I hope to come back to it in the future), but it allows the user to upload an overview.png file from the save game map files. It currently supports zoom and moving it by clicking and dragging.

# Prototypes
The prototypes for this dashboard, from wireframes to mockups can be found on Figma.
https://www.figma.com/file/EOn8PPY4cgGB29cBBp3XdK/Mockups?type=design&node-id=168%3A315&mode=design&t=Uzp93VEuUC2rzx5p-1

# Vite + Vue Setup

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
