// export class Transaction {
//      public name: string;
//      public accountNo: string;
//      public status: boolean;
//      public amount: number;
//      public bankName: string;
//      public transactionType: string;
//      public date: Date;
//     constructor(name: string, accountNo: string, status: boolean, amount: number, bankName: string, transactionType: string, date: Date) {
//          this.name = name;
//          this.accountNo = accountNo;
//          this.status = status;
//          this.amount = amount;
//          this.bankName = bankName;
//          this.transactionType = transactionType;
//          this.date = date;
//      }
// }

export interface Transaction {
     _id: string;
     status: boolean;
     amount: number;
     date: Date;
     name: string;
     accountNo: string;
     bankName:string;
     transactionType: string;
     type: string;
}