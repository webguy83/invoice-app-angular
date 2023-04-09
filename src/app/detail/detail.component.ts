import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/utils/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  invoice!: Invoice;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.invoice = this.route.snapshot.data['invoice'];
  }
}
