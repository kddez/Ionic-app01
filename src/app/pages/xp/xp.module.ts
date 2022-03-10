import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XpPageRoutingModule } from './xp-routing.module';

import { XpPage } from './xp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XpPageRoutingModule
  ],
  declarations: [XpPage]
})
export class XpPageModule {}
