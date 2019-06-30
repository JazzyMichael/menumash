import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'items', loadChildren: '../items/items.module#ItemsPageModule' },
      { path: 'saved', loadChildren: '../saved/saved.module#SavedPageModule' },
      { path: 'item-details', loadChildren: '../item-details/item-details.module#ItemDetailsPageModule' },
      { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
      { path: '**', redirectTo: '/tabs/home', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
