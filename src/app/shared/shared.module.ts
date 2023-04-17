import { StatusComponent } from './../status/status.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StyledButtonDirective } from './directives/styled-button.directive';
import { LoadingComponent } from './loading/loading.component';
import { SortcharsPipe } from './pipes/sortchars.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    StyledButtonDirective,
    StatusComponent,
    SortcharsPipe,
  ],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [
    LoadingComponent,
    StyledButtonDirective,
    StatusComponent,
    SortcharsPipe,
  ],
})
export class SharedModule {}
