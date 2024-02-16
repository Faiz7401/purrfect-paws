import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cats-fact',
    pathMatch: 'full'
  },
  {
    path: 'cats-fact',
    loadChildren: () => import('./cats-fact/cats-fact.module').then( m => m.CatsFactPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
