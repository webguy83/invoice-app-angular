import { StatusComponent } from './../status/status.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StyledButtonDirective } from './directives/styled-button.directive';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoadingComponent, StyledButtonDirective, StatusComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingComponent, StyledButtonDirective, StatusComponent],
})
export class SharedModule {}
