import {Field} from "../components/Fields/FieldTable.vue";

export class FieldImpl implements Field {
    private _currentCrop: string;
    private _farmlandId: number;
    private _fertilized: number;
    private _fieldSizeHa: number;
    private _growthStage: number;
    private _limed: number;
    private _mulched: boolean;
    private _owned: boolean;
    private _plowed: boolean;
    private _previousCrop: string;
    private _weeded: boolean;


    constructor(currentCrop: string, farmlandId: number, fertilized: number, fieldSizeHa: number, growthStage: number,
                limed: number, mulched: boolean, owned: boolean, plowed: boolean, previousCrop: string,
                weeded: boolean) {
        this._currentCrop = currentCrop;
        this._farmlandId = farmlandId;
        this._fertilized = fertilized;
        this._fieldSizeHa = fieldSizeHa;
        this._growthStage = growthStage;
        this._limed = limed;
        this._mulched = mulched;
        this._owned = owned;
        this._plowed = plowed;
        this._previousCrop = previousCrop;
        this._weeded = weeded;
    }


    get currentCrop(): string {
        return this._currentCrop;
    }

    set currentCrop(value: string) {
        this._currentCrop = value;
    }

    get farmlandId(): number {
        return this._farmlandId;
    }

    set farmlandId(value: number) {
        this._farmlandId = value;
    }

    get fertilized(): number {
        return this._fertilized;
    }

    set fertilized(value: number) {
        this._fertilized = value;
    }

    get fieldSizeHa(): number {
        return this._fieldSizeHa;
    }

    set fieldSizeHa(value: number) {
        this._fieldSizeHa = value;
    }

    get growthStage(): number {
        return this._growthStage;
    }

    set growthStage(value: number) {
        this._growthStage = value;
    }

    get limed(): number {
        return this._limed;
    }

    set limed(value: number) {
        this._limed = value;
    }

    get mulched(): boolean {
        return this._mulched;
    }

    set mulched(value: boolean) {
        this._mulched = value;
    }

    get owned(): boolean {
        return this._owned;
    }

    set owned(value: boolean) {
        this._owned = value;
    }

    get plowed(): boolean {
        return this._plowed;
    }

    set plowed(value: boolean) {
        this._plowed = value;
    }

    get previousCrop(): string {
        return this._previousCrop;
    }

    set previousCrop(value: string) {
        this._previousCrop = value;
    }

    get weeded(): boolean {
        return this._weeded;
    }

    set weeded(value: boolean) {
        this._weeded = value;
    }
}