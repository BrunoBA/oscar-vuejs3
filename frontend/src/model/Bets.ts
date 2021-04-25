import {Choice} from '@/model/Choice';

export class Bets {

    private categories: Array<Choice>

    constructor(categories: Array<Choice>) {
        this.categories = []
    }

    private getChoiceByCategory(categoryId: number): Choice | null {

        if (this.categories.length == 0) {
            return null
        }

        const choice = this.categories.find(choice => choice.id == categoryId);
        if (choice == undefined) {
            return null
        }

        return choice
    }

    private createAChoice(categoryId: number, winner: number): void {
        const choice = new Choice(categoryId, winner)
        this.categories.push(choice)
    }

    private updateChoice(choiceToUpdate: Choice): void {
        this.categories = this.categories.map(choice => {
            if (choice.id === choiceToUpdate.id) {
                choice.winner = choiceToUpdate.winner
            }

            return choice
        })
    }

    addChoice(categoryId: number, winner: number): void {
        const choice = this.getChoiceByCategory(categoryId)
        if (choice === null) {
            this.createAChoice(categoryId, winner)
            return
        }

        choice.winner = winner
        this.updateChoice(choice)
    }

    getWinnerByCategory(categoryId: number): number | null {
        const choice = this.getChoiceByCategory(categoryId)

        if (choice === null) {
            return null
        }

        return choice.winner
    }

    isComplete(): boolean {
        return this.categories.length === 23;
    }

}
