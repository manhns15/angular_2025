import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { EmptyStateComponent } from './shared/components/empty-state/empty-state.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoaderComponent,
    EmptyStateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, ShareModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
