import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedPage } from './saved.page';
import { ItemListComponent } from './item-list/item-list.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: SavedPage,
    children: [
      { path: 'item-list', component: ItemListComponent },
      { path: 'orders', component: OrdersComponent }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SavedPage,
    ItemListComponent,
    OrdersComponent
  ]
})
export class SavedPageModule {}
