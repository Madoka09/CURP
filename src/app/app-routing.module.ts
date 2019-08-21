import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
  { path: 'cargo', loadChildren: './cargo/cargo.module#CargoPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
