import { Component } from "@angular/core";
import { NavController, Platform, MenuController } from "ionic-angular";
import { GeofenceDetailsPage } from "../geofence-details/geofence-details";
import { GeofenceService } from "../../services/geofence-service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: "geofence-list.html"
})
export class GeofenceListPage {
  isLoading: boolean = false;
  geofences: [Geofence];

  constructor(
    private nav: NavController,
    private geofenceService: GeofenceService,
    private platform: Platform,
    private menu: MenuController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.isLoading = true;
    this.platform.ready().then(() => {
      this.geofenceService.findAll()
        .then(geofences => {
          this.geofences = geofences;
          this.isLoading = false;
        })
        .catch(() => this.isLoading = false);
    });
  }

  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  new() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const geofence = this.geofenceService.create({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });

        this.transitionToDetailsPage(geofence);
      },
      (error) => {

      },
      { timeout: 5000 }
    );
  }

  geofenceItemTapped(geofence) {
    this.transitionToDetailsPage(geofence);
  }

  transitionToDetailsPage(geofence) {
    this.nav.push(GeofenceDetailsPage, {
      geofence
    })
  }
}
