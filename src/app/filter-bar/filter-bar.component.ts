import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BreakpointsService } from '../services/breakpoint.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  $bp!: Observable<string>;
  status = this._formBuilder.group({
    draft: false,
    pending: false,
    paid: false,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private breakpointService: BreakpointsService
  ) {}

  ngOnInit(): void {
    this.$bp = this.breakpointService.breakpoint$;
  }
}
