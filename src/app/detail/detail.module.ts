import { DetailComponent } from './detail.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [DetailComponent, ConfirmDialogComponent],
  imports: [
    SharedModule,
    CommonModule,
    DetailRoutingModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class DetailModule {}
