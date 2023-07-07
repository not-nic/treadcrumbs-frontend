export class Farm {
    private _id: number;
    private _farmName: string;
    private _loan: number;
    private _money: number;
    private _players: {userId: string, playerName: string }

    constructor(id: number, farmName: string, loan: number, money: number, players: {
        userId: string;
        playerName: string
    }) {
        this._id = id;
        this._farmName = farmName;
        this._loan = loan;
        this._money = money;
        this._players = players;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get farmName(): string {
        return this._farmName;
    }

    set farmName(value: string) {
        this._farmName = value;
    }

    get loan(): number {
        return this._loan;
    }

    set loan(value: number) {
        this._loan = value;
    }

    get money(): number {
        return this._money;
    }

    set money(value: number) {
        this._money = value;
    }

    get players(): { userId: string; playerName: string } {
        return this._players;
    }

    set players(value: { userId: string; playerName: string }) {
        this._players = value;
    }
}