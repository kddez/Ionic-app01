import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XpPage } from './xp.page';

const routes: Routes = [
  {
    path: '',
    component: XpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XpPageRoutingModule {}
