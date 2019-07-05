import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';
import { KeysPipeModule } from '../pipes/pipe.module';
// import { KeysPipe } from '../pipes/pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    TranslateModule,
    CommonModule,
    KeysPipeModule,
    FormsModule,

    RouterModule.forChild([{ path: '', component: CartPage }])
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
