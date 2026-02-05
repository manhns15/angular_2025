import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterviewCaseModule } from './interview-case/interview-case.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, InterviewCaseModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
