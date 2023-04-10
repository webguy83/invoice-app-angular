import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/utils/interfaces';
import { Component, OnInit } from '@angular/core';
import { BreakpointsService } from '../services/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  $bp!: Observable<string>;
  invoice!: Invoice;
  constructor(
    private route: ActivatedRoute,
    private breakpointService: BreakpointsService
  ) {}

  ngOnInit(): void {
    this.invoice = this.route.snapshot.data['invoice'];
    this.$bp = this.breakpointService.breakpoint$;
  }
}
