import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssTempDrivenFormRoutingModule } from './ass-temp-driven-form-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { AssTempDrivenFormComponent } from './ass-temp-driven-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
    AssTempDrivenFormComponent,
  ],
  imports: [CommonModule, AssTempDrivenFormRoutingModule, FormsModule],
})
export class AssTempDrivenFormModule {}
