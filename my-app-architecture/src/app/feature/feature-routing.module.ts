import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { ParentComponent } from './parent/parent.component';
import { LifecycleComponent } from './lifecycle/lifecycle.component';

const routes: Routes = [
  { path: '', component: FeatureComponent },
  { path: 'test', component: ParentComponent },
  { path: 'lcl', component: LifecycleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
