
# Treadcrumbs Frontend - A Farming Simulator Companion and Analysis web application.
![Dashboard](https://i.imgur.com/2Ljt9oD.png)
## Project Description
This is the frontend for my dissertation project. This is an analytical and companion web application for Farming Simulator 22, which improves player productivity through different [features.](#features) Once the save game XML is parsed by the Spring Boot backend ([See the repository here](https://github.com/not-nic/treadcrumbs-backend)), the stored data is then requested across different Vue dashboard components.

Most of the dashboard components are finished but require improvement. Like the backend there are some choices which may seem silly but they are intentional. Particularly, the use of `$emit` and Pinia Stores to pass data between child components. I do this because within my report I talk about issues with [prop drilling](https://vuejs.org/guide/components/provide-inject.html#prop-drilling) and its disadvantages.

### Features
The dashboard is spilt up into five elements, which are listed below:

- **Vehicle Maintenance** – This lists all the vehicles and attachments found within an upload save game, which allows users to see all stats about their vehicle such as durability and fuel without entering it in game. [Vehicles Gif](https://i.imgur.com/dKvbhLA.gif)

- **Fields** - The first element on the dashboard shows the total farm area and the combined amount of area each crop type takes up, as a table and pie chart. Clicking the view button shows a detailed look at each field and what is required to improve their yield. [Fields Gif](https://i.imgur.com/RTtBqV9.gif)

- **Notes** - This allows either users to type plaintext to remind them of something to do, or a discord-esque slash command system to quickly generate repetitive notes. [Notes Gif](https://i.imgur.com/Ke43tjA.gif)

- **Finances** -  This shows all finance data taken from the save game - allowing users to view a breakdown of costs related to their farm. [Finance Gif](https://i.imgur.com/91J5PFE.gif)

- **Map** - This allows a user to upload a map image that can be panned and zoomed, I had planned additional functionality, which would allow users to generate 'absolute' positioned SVG images to represent their in-game fields, which can be seen in the mockups. [Map Gif](https://i.imgur.com/xf3DpuN.gif)

### Example files
**Example Save Game -** [project_savegame.zip](https://github.com/not-nic/treadcrumbs-frontend/files/12649580/project_savegame.zip)
**Example map image -** [overview.png](https://github.com/not-nic/treadcrumbs-frontend/assets/67616855/cdc22ab0-31d7-4d1f-889f-8eae41345ec3)

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
3. Start a development server by using:
```bash
npm run dev
```
4. Access the app by visiting [http://localhost:5173/](http://localhost:5173/)
