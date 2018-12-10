import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockServerService } from '../../services/mock-server.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private _operators: String[];
  public selectedOption = '';

  constructor(private _mss: MockServerService, private _router: Router) { }

  ngOnInit() {
    this._operators = this._mss.getOperators();
  }

  get operators() {
    return this._operators;
  }

  public selectOperator() {
    if (this.selectedOption.length <= 0) {
      console.log('No option is selected');
      return;
    }
    this._router.navigate(['/', 'refill', this.selectedOption]);
  }

}
