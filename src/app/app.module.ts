import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";

import { GeofenceDetailsPage } from "../pages/geofence-details/geofence-details";
import { GeofenceListItem } from "../components/geofence-list-item/geofence-list-item";
import { GeofenceListPage } from "../pages/geofence-list/geofence-list";
import { GeofenceService } from "../services/geofence-service";
import { MyApp } from "./app.component";

const components = [
  MyApp,
  GeofenceDetailsPage,
  GeofenceListPage,
  GeofenceListItem
]

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GeofenceService
  ]
})
export class AppModule {}
