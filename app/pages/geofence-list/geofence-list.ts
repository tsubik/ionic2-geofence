import { Page, NavController, Platform } from "ionic/ionic";
import { GeofenceDetailsPage } from "../geofence-details/geofence-details";
import { GeofenceService } from "../../services/geofence-service";

@Page({
  templateUrl: "build/pages/geofence-list/geofence-list.html"
})
export class GeofenceListPage {
  constructor(
    private nav: NavController,
    private geofenceService: GeofenceService
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.geofenceService.findAll().then(geofences => this.geofences=geofences)
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

  itemTapped(event, geofence) {
    this.transitionToDetailsPage(geofence);
  }

  transitionToDetailsPage(geofence) {
    this.nav.push(GeofenceDetailsPage, {
      geofence
    })
  }
}
