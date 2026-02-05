import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewCaseRoutingModule } from './interview-case-routing.module';
import { PipesComponentComponent } from './pipes-component/pipes-component.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import {
  FilterPipePipe,
  ImpureFilterPipe,
} from './pipes-component/pipes/filter-pipe.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PipesComponentComponent,
    ReactiveFormsComponent,
    FilterPipePipe,
    ImpureFilterPipe,
  ],
  imports: [CommonModule, InterviewCaseRoutingModule, ReactiveFormsModule],
})
export class InterviewCaseModule {}
