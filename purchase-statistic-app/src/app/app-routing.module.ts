import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { D3ChartsModule } from './d3-charts/d3-charts.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    D3ChartsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
