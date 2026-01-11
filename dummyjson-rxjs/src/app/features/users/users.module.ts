import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [UserDetailPageComponent],
  imports: [CommonModule, UsersRoutingModule, ShareModule],
})
export class UsersModule {}
