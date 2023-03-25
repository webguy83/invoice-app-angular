import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StyledButtonDirective } from './directives/styled-button.directive';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoadingComponent, StyledButtonDirective],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingComponent, StyledButtonDirective],
})
export class SharedModule {}
