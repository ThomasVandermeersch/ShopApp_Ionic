import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { ProductComponent } from './product/product.component';
import {ProductAddComponent} from './product-add/product-add.component'
import { SingleProductComponent } from './single-product/single-product.component'


@NgModule({
  declarations: [AppComponent, ProductComponent, SingleProductComponent, ProductAddComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
