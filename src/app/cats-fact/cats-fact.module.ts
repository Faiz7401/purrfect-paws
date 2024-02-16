import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatsFactPageRoutingModule } from './cats-fact-routing.module';

import { CatsFactPage } from './cats-fact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatsFactPageRoutingModule
  ],
  declarations: [CatsFactPage]
})
export class CatsFactPageModule {}
