import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bill-from-form',
  templateUrl: './bill-from-form.component.html',
  styleUrls: ['./bill-from-form.component.scss'],
})
export class BillFromFormComponent implements OnInit {
  form = this.fb.group({});

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
