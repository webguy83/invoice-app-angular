import { DetailComponent } from './detail.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DetailComponent],
  imports: [SharedModule, CommonModule, DetailRoutingModule, MatIconModule],
})
export class DetailModule {}
