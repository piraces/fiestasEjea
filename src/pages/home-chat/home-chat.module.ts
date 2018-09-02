import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeChatPage } from './home-chat';

@NgModule({
  declarations: [
    HomeChatPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeChatPage),
  ],
})
export class HomeChatPageModule {}
