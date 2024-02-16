import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatsFactPage } from './cats-fact.page';

const routes: Routes = [
  {
    path: '',
    component: CatsFactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatsFactPageRoutingModule {}
