import { Page, NavController, Platform, IonicApp } from "ionic-angular";
import { GeofenceDetailsPage } from "../geofence-details/geofence-details";
import { GeofenceService } from "../../services/geofence-service";
import { GeofenceListItem } from "../../components/geofence-list-item/geofence-list-item";
import { Splashscreen } from "ionic-native";

@Page({
  templateUrl: "build/pages/geofence-list/geofence-list.html",
  directives: [GeofenceListItem]
})
export class GeofenceListPage {
  isLoading: boolean = false;
  geofences: [Geofence];

  constructor(
    private nav: NavController,
    private geofenceService: GeofenceService,
    private platform: Platform,
    private app: IonicApp
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

  onPageDidEnter() {
    const menu = this.app.getComponent("leftMenu");

    menu.enable(true);
  }

  onPageLoaded() {
    Splashscreen.hide();
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
