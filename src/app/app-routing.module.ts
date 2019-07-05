import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', },
  { path: 'checkout/address', loadChildren: './checkout/address/address.module#CheckoutAddressPageModule' },
  { path: 'checkout/checkout', loadChildren: './checkout/checkout/checkout.module#CheckoutPageModule' },
  { path: 'order-summary/:id', loadChildren: './checkout/order-summary/order-summary.module#OrderSummaryPageModule' },
  { path: 'edit-address', loadChildren: './account/edit-address/edit-address.module#EditAddressPageModule' },
  { path: 'review', loadChildren: './review/review.module#ReviewPageModule' },
  { path: 'map', loadChildren: './account/map/map.module#MapPageModule' },
  { path: 'filter', loadChildren: './filter/filter.module#FilterPageModule' },
 // { path: 'history', loadChildren: './account/history/history.module#HistoryPageModule' },
 // { path: 'points', loadChildren: './account/points/points.module#PointsPageModule' },
  //{ path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
