import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoadingService } from '../shared/loading/loading.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HomeComponent,
    FilterBarComponent,
    CustomCheckboxComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    InvoiceRoutingModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [LoadingService],
})
export class InvoicesModule {}
