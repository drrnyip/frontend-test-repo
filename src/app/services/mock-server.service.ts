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

  public addOperator(name: string, accounts: {}) {
    this._operators[name] = accounts;
    return this._operators[name];
  }

  public verifyOperator(name: string) {
    return this._operators[name] ? true : false;
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
