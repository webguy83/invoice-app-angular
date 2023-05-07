import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-to-form',
  templateUrl: './bill-to-form.component.html',
  styleUrls: ['./bill-to-form.component.scss'],
})
export class BillToFormComponent implements OnInit {
  billToForm = this.fb.group({
    clientName: ['', [Validators.required]],
    clientEmail: ['', [Validators.required, Validators.email]],
    clientStreetAddress: ['', [Validators.required]],
    clientCity: ['', [Validators.required]],
    clientPostCode: ['', [Validators.required]],
    clientCountry: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
