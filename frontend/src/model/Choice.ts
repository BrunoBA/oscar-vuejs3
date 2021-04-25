export class Choice {
    private _id: number;
    private _winner: number

    constructor(id: number, winner: number) {
        this._id = id;
        this._winner = winner;
    }

    get id(): number {
        return this._id;
    }

    get winner(): number {
        return this._winner;
    }

    set id(value: number) {
        this._id = value;
    }

    set winner(value: number) {
        this._winner = value;
    }

    toJSON() {
        return {
            id: this.id,
            winner: this.winner
        }
    }
}
