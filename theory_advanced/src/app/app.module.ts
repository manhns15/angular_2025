import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateDrivenFormModule } from './template-driven-form/template-driven-form.module';
import { ReactiveFormModule } from './reactive-form/reactive-form.module';
import { AssTempDrivenFormModule } from './ass-temp-driven-form/ass-temp-driven-form.module';
import { HttpClientModule } from '@angular/common/http';
import { AssReactiveFormModule } from './ass-reactive-form/ass-reactive-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateDrivenFormModule,
    ReactiveFormModule,
    AssTempDrivenFormModule,
    HttpClientModule,
    AssReactiveFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
