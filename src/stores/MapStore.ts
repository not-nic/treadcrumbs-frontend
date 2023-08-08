import {defineStore} from "pinia";

export const useMapStore = defineStore('mapStore', {
    state: () => ({
        mapImageUrl: '',
        imageSize: {height: 0, width: 0},
        mapVisibility: false
    }),

    actions: {
        setMapImage(url: string) {
            this.mapImageUrl = url;
        },

        setImageSize(size: {height: number; width: number}) {
            this.imageSize = size;
        },

        showMap(): void {
            this.mapVisibility = true;
        },

        hideMap(): void {
            this.mapVisibility = false;
        }
    }
})