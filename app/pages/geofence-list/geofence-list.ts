import { Page, NavController } from "ionic/ionic";
import { GeofenceDetailsPage } from "../geofence-details/geofence-details";
import { GeofenceService } from "../../services/geofence-service";

@Page({
  templateUrl: "build/pages/geofence-list/geofence-list.html"
})
export class GeofenceListPage {
  constructor(nav: NavController, geofenceService: GeofenceService) {
    this.geofenceService = geofenceService;
    this.nav = nav;
    geofenceService.findAll().then(geofences => this.geofences=geofences)
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
