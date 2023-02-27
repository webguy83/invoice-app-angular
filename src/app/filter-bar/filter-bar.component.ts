import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  status = this._formBuilder.group({
    draft: false,
    pending: false,
    paid: false,
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}
}
