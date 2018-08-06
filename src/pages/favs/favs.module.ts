import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavsPage } from './favs';

@NgModule({
  declarations: [
    FavsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavsPage),
  ],
})
export class FavsPageModule {}
