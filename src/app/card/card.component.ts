import { Component, Input } from '@angular/core';
import { Status } from '../utils/interfaces';

interface CardData {
  id: string;
  paymentDue: string;
  clientName: string;
  total: number;
  status: Status;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() cardData: CardData | null = null;
  @Input() showLargeCard = true;

  constructor() {}
}
