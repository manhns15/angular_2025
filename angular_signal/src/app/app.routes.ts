import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'multi-step-form',
    loadComponent: () =>
      import('./features/multi-step-form/multi-step-form').then((m) => m.MultiStepFormComponent),
  },
  {
    path: 'multi-step-form-classic',
    loadComponent: () =>
      import('./features/multi-step-form-classic/multi-step-form-classic').then(
        (m) => m.MultiStepFormClassicComponent,
      ),
  },
  { path: '', redirectTo: 'multi-step-form', pathMatch: 'full' },
];
