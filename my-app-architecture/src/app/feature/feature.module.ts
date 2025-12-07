import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { FormsModule } from '@angular/forms';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { ToggleComponent } from './toggle/toggle.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';

@NgModule({
  declarations: [FeatureComponent, ParentComponent, ChildComponent, ToggleComponent, LifecycleComponent],
  imports: [CommonModule, FormsModule, FeatureRoutingModule],
})
export class FeatureModule {}
