import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditAddressPage } from './edit-address.page';
import { KeysPipeModule } from '../../pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: EditAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    KeysPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditAddressPage]
})
export class EditAddressPageModule {}
