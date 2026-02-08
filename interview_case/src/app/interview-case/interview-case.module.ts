import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InterviewCaseRoutingModule } from './interview-case-routing.module';
import { PipesComponentComponent } from './pipes-component/pipes-component.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import {
  FilterPipePipe,
  ImpureFilterPipe,
} from './pipes-component/pipes/filter-pipe.pipe';
import { ShareReplayComponent } from './share-replay/share-replay.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    PipesComponentComponent,
    ReactiveFormsComponent,
    FilterPipePipe,
    ImpureFilterPipe,
    ShareReplayComponent,
    LoginComponent,
    ProtectedComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InterviewCaseRoutingModule,
  ],
})
export class InterviewCaseModule {}
