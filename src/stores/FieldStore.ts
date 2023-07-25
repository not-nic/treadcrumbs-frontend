import {defineStore} from "pinia";
import {Field} from "../components/Fields/FieldTable.vue";
import {FieldImpl} from "../ts/FieldImpl.ts";
import {crops} from "../ts/Crops.ts";
import axios from "axios";

export  const useFieldStore = defineStore('fieldStore', {
    state: () => ({
        showHarvestModal: false,
        currentProfit: Number,
        currentYield: Number,
        currentCrop: String,
        currentField: {} as Field
    }),

    actions: {
        openHarvestModal(): void {
            this.showHarvestModal = true;
        },

        closeHarvestModal(): void {
            this.showHarvestModal = false;
        },

        async harvestField(existingField: Field): Promise<FieldImpl> {
            let updatedField = new FieldImpl();
            const crop = crops.find(c => c.name === existingField.currentCrop);

            updatedField.previousCrop = crop ? crop.name : '';
            updatedField.currentCrop = 'no crop planted yet.';
            updatedField.farmlandId = existingField.farmlandId;
            updatedField.growthStage = 0;
            updatedField.fieldSizeHa = existingField.fieldSizeHa;
            updatedField.fertilized = 0;
            updatedField.limed = this.calculateLimeReduction(existingField.limed);
            updatedField.owned = existingField.owned;
            updatedField.plowed = this.updatePlowedState(crop.name, existingField.plowed);
            updatedField.mulched = existingField.mulched;
            updatedField.weeded = false;

            try {
                const response = axios.post(`api/fields/${existingField.id}`, {
                    previousCrop: updatedField.previousCrop,
                    currentCrop: updatedField.currentCrop,
                    farmlandId: updatedField.farmlandId,
                    growthStage: updatedField.growthStage,
                    fieldSizeHa: updatedField.fieldSizeHa,
                    fertilized: updatedField.fertilized,
                    limed: updatedField.limed,
                    owned: updatedField.owned,
                    plowed: updatedField.plowed,
                    mulched: updatedField.mulched,
                    weeded: updatedField.weeded
                })

                this.closeHarvestModal();
                console.log(response);

                return updatedField;
            } catch (error) {
                console.error(`Failed to update field ${existingField.id}`, error)
            }

            return updatedField;
        },

        calculateLimeReduction(ph: number): number {
            return ph - 0.25;
        },

        updatePlowedState(cropType: string, plowed: boolean): boolean {
            const crop = crops.find(c => c.name === cropType);
            let rootCrop = crop ? crop.rootCrop : false

            // crop is a root crop, return false - the field must be plowed.
            if (rootCrop) {
                return false
            }

            // the field is not a root crop, but is also not plowed.
            if (!rootCrop && !plowed) {
                return false
            }

            // field is a not root crop and is already plowed.
            return !rootCrop && plowed;

        }
    }
})

