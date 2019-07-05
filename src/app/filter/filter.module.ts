import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
//import { FilterPage } from './filter.page';
import { KeysPipeModule } from './../pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    //component: FilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    KeysPipeModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class FilterPageModule {}
