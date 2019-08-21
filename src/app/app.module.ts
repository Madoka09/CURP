import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditPageModule } from '../app/edit/edit.module';
import { PersonaService } from '../services/persona.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapPageModule } from '../app/map/map.module';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    EditPageModule,
    MapPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PersonaService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
