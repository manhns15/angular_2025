import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./template-driven-form/template-driven-form.module').then(
        (m) => m.TemplateDrivenFormModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./reactive-form/reactive-form.module').then(
        (m) => m.ReactiveFormModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./ass-reactive-form/ass-reactive-form.module').then(
        (m) => m.AssReactiveFormModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
