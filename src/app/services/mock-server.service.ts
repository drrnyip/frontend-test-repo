import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockServerService {
  private _operators: {} = {
    'MTS': {},
    'Beeline': {},
    'Megafon': {}
  };

  constructor() { }

  public getOperators() {
    return Object.keys(this._operators);
  }

  public verifyOperator(name: string) {
    return this._operators[name] ? true : false;
  }

  // Operator mutations
  public addOperator(operator: string, accounts: {}) {
    this._operators[operator] = accounts;
    return this._operators[operator];
  }

  public removeOperator(operator: string) {
    if (this._operators[operator]) { delete this._operators[operator]; }
  }

  // Account mutations
  public addAccount(operator: string, number: string, starting_balance: number = 0) {
    return new Promise((res, rej) => {
      if (this._operators[operator]) {
        const activeOperator = this._operators[operator];
        if (activeOperator[number]) {
          rej('Account already exists');
        }
        activeOperator[number] = starting_balance;
      }
      rej('Failed to add account to operator');
    });
  }
  public deleteAccount(operator: string, number: string) {
    return new Promise((res, rej) => {
      if (this._operators[operator] && this._operators[operator][number]) {
        delete this._operators[operator][number];
        res();
      }
      rej('Failed to delete account');
    });
  }

  public refillAccount(operator: string, number: string, amount: number) {
    return new Promise((res, rej) => {
      // Two second delay to simulate server response time.
      setTimeout(() => {
        if (!this._randomSuccess()) {
          rej('Request failed');
        }
        if (this._operators[operator]) {
          const activeOperator = this._operators[operator];
          if (!activeOperator[number]) {
            activeOperator[number] = 0;
          }
          activeOperator[number] += amount;
        }
        res({
          operator,
          number,
          amount
        });
      }, 2000);
    });
  }

  private _randomSuccess() {
    // Simulating random success and error cases
    return Math.random() > 0.5;
  }
}
