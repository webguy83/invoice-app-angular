import { Component, Input } from '@angular/core';
import { Item, Status } from '../../utils/interfaces';

interface CardData {
  id: string;
  createdAt: Date;
  paymentTerms: number;
  clientName: string;
  items: Item[];
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
