import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/utils/interfaces';
import { Component, OnInit } from '@angular/core';
import { cutId } from '../utils';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  invoice!: Invoice;
  cutId = cutId;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.invoice = this.route.snapshot.data['invoice'];
    console.log(this.invoice);
  }
}
