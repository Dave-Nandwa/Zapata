import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { KeysPipeModule } from '../../pipes/pipe.module';
import { BlogPage } from './blog.page';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: BlogPage
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
  declarations: [BlogPage]
})
export class BlogPageModule {}
