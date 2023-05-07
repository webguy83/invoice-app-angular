import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-from-form',
  templateUrl: './bill-from-form.component.html',
  styleUrls: ['./bill-from-form.component.scss'],
})
export class BillFromFormComponent implements OnInit {
  billFromForm = this.fb.group({
    senderStreetAddress: ['', [Validators.required]],
    senderCity: ['', [Validators.required]],
    senderPostCode: ['', [Validators.required]],
    senderCountry: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
