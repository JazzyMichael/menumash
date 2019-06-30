import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'info', component: InfoComponent },
      { path: 'friends', component: FriendsComponent }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    ProfileComponent,
    InfoComponent,
    FriendsComponent
  ]
})
export class HomePageModule {}
