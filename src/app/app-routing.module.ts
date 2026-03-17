import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'services', loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule) },
  { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
