import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddressPage } from './address.page';
import { TranslateModule } from '@ngx-translate/core';
import { KeysPipeModule } from '../../pipes/pipe.module';
 
const routes: Routes = [
  {
    path: '',
    component: AddressPage
  }
];

@NgModule({
  imports: [
    KeysPipeModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddressPage]
})
export class AddressPageModule {}
