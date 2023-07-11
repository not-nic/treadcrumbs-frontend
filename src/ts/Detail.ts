export class Detail {
    private _title: string
    private _totalValue: number
    private _items: Array<{
        key: string,
        value: number
    }>

    constructor(title: string, totalValue: number, items: Array<{ key: string; value: number }>) {
        this._title = title;
        this._totalValue = totalValue;
        this._items = items;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get totalValue(): number {
        return this._totalValue;
    }

    set totalValue(value: number) {
        this._totalValue = value;
    }

    get items(): Array<{ key: string; value: number }> {
        return this._items;
    }

    set items(value: Array<{ key: string; value: number }>) {
        this._items = value;
    }
}