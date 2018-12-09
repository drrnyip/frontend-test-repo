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
}
