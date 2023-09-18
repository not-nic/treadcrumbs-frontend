
# Treadcrumbs Frontend - A Farming Simulator Companion and Analysis web application.
This is the frontend for my final university project. It is a analysis and companion web application for Farming Simulator 22. 
It works by uploading a Farming Simulator 22 save game which is read and displayed to the user using Spring Boot. (The SpringBoot backend can be found [here](https://github.com/not-nic/treadcrumbs).)

![Dashboard](https://i.imgur.com/2Ljt9oD.png)
## Project Description
Once the contents of the save game are read, it will be shown back to the user through this frontend - showing the user how they can improve the efficiency of their virtual farm.\
The main features are:
- Fields: This shows all the stats about a players field and how their yields can be improved.
- Notes: This allows either users to type plaintext to remind them of something to do, or a discord-esque slash command system to quickly generate repetitive notes.
- Vehicles: This shows all the vehicles and attachments within the save game, alongside their fuel level, durability and last job, so a user can check their state without entering them in game.
- Finances: This shows all data taken about the save game about the user's finances - allowing them to add money by selling crops & goods and removing money by buying vehicles and fields.
- Map: This part remains mostly unfinished due to time constraints (but I hope to come back to it in the future), but it allows the user to upload an overview.png file from the save game map files. It currently supports zoom and moving it by clicking and dragging.
## Prototypes
The Mock-ups and Wireframes for the dashboard can be found below:
### [Mockups](https://www.figma.com/file/EOn8PPY4cgGB29cBBp3XdK/Mockups?type=design&node-id=168%3A315&mode=design&t=Uzp93VEuUC2rzx5p-1)
## Install Guide
1. Clone this repository on your machine using the following command:
```bash
git clone https://github.com/not-nic/treadcrumbs-frontend.git
cd treadcrumbs-frontend
```
2. Navigate to the project and install the required dependencies using:
```bash
npm install
```
4. Start a development server by using:
```bash
npm run dev
```
5. Access the app by visiting [http://localhost:5173/](http://localhost:5173/)


