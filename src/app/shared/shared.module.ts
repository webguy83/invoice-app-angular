import { StatusComponent } from './../status/status.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StyledButtonDirective } from './directives/styled-button.directive';
import { LoadingComponent } from './loading/loading.component';
import { SortcharsPipe } from './pipes/sortchars.pipe';
import { BackButtonDirective } from './directives/back-button.directive';
import { StyledInputDirective } from './directives/styled-input.directive';
import { AdddaysPipe } from './pipes/adddays.pipe';
import { AddnumsPipe } from './pipes/addnums.pipe';
import { ConvertItemsPipe } from './pipes/convert-items.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    StyledButtonDirective,
    StatusComponent,
    SortcharsPipe,
    BackButtonDirective,
    StyledInputDirective,
    AdddaysPipe,
    AddnumsPipe,
    ConvertItemsPipe,
  ],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [
    LoadingComponent,
    StyledButtonDirective,
    StatusComponent,
    SortcharsPipe,
    BackButtonDirective,
    StyledInputDirective,
    AdddaysPipe,
    AddnumsPipe,
    ConvertItemsPipe,
  ],
})
export class SharedModule {}
