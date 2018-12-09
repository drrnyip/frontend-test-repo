import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements OnInit {

  public operator: String = '';
  public refillForm: FormGroup;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _fb: FormBuilder) { }

  ngOnInit() {
    this.operator = this._activatedRoute.snapshot.params['operator'];
    this.refillForm = this._fb.group({
      phone: ['', [Validators.required]],
      amount: ['', Validators.required]
    });
  }

  public returnToOperator() {
    this._router.navigate(['/', 'operators']);
  }

  public confirmRefill() {
    let errors = false;
    const refillAmount = this.refillForm.value.amount.replace(/\D/g, '');
    const phoneNumber = this.refillForm.value.phone.replace(/\D/g, '');
    if (this.refillForm.dirty && !this.refillForm.errors) {
      if (refillAmount < 0 || refillAmount > 1000) {
        this.refillForm.controls['amount'].setErrors({ 'invalid': true });
        errors = true;
      }
      if (phoneNumber.length > 10 || phoneNumber.length < 9) {
        this.refillForm.controls['phone'].setErrors({ 'invalid': true });
        errors = true;
      }

      if (!errors) {
        // Disable inputs
        // this.refillForm.disable();
        
      }
    }
  }

  public maskAmount(event) {
    console.log(this.refillForm);
    // Currently code does not allow breaking up a ruble.
    const allowedKeycodes = [8];
    if (event.key.match(/^\d+$/)) {
      const amount = this.refillForm.controls.amount.value;
      console.log('amount: ' + amount);
      const mask = amount.replace(/\D/g, '');
      if (mask + event.key <= 1000 && mask + event.key >= 0) {
        this.refillForm.setValue({
          phone: this.refillForm.value.phone,
          amount: `${mask}`
        });
      }
    } else if (!allowedKeycodes.includes(event.keyCode)) {
      event.preventDefault();
      return;
    }
  }

  public maskPhone(event) {
    if (event.keyCode === 8 || event.key.match(/^\d+$/)) {
      const number = this.refillForm.controls.phone.value;
      const mask = number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})/);
      this.refillForm.setValue({
        phone: !mask[2] ? mask[1] : '(' + mask[1] + ') ' + mask[2] + (mask[3] ? '-' + mask[3] : '') + (mask[4] ? '-' + mask[4] : ''),
        amount: this.refillForm.value.amount
      });
    } else {
      event.preventDefault();
      return;
    }
  }


}
