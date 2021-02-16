export interface Card {
    _id: string,
    inCardAmount: number,
    spentAmount: number,
    cardName: string,
    cardNumber: string,
    type: string
}

export interface Account {
    amount: number,
    date: Date,
    _id: string,
    //accountNo: string,
    owner: string
}