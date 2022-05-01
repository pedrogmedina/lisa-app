import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerPageComponent } from './pages/explorer/explorer-page.component';
import { HomePageComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'explorer', component: ExplorerPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
