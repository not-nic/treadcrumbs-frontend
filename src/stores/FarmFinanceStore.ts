import { defineStore } from "pinia";
import axios from "axios";

export interface Finance {

}

export const useFinanceStore = defineStore('FinanceStore', {
    state: () => ({
        finances: [] as Finance[]
    }),

    actions: {
        async getData() {
            try {
                const response  = await axios.get('/api/finances')
                this.finances = response.data;

                // console.log(this.finances)

            } catch (error) {
                console.error("Failed to get finances:", error)
            }
        },

        sumProperty(objects: Finance[], property: keyof Finance): number {
            let total = 0;

            for (const obj of objects) {
                if (typeof obj[property] === 'number') {
                    total += obj[property] as number;
                }
            }

            return total
        }
    }
})


