import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { HomeComponent } from './components/home/home.component';
import { PurchaseItemComponent } from './components/home/purchase-item/purchase-item.component';
import { D3ChartsModule } from './d3-charts/d3-charts.module';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    HomeComponent,
    PurchaseItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    D3ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
