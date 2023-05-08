import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  form = this.fb.group({
    billFromForm: [],
    billToForm: [],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
  }
}
