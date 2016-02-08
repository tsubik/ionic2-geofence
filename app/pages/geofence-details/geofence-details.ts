import { Page, NavController, NavParams } from "ionic/ionic";
import * as Leaflet from "leaflet";

@Page({
  templateUrl: "build/pages/geofence-details/geofence-details.html"
})
export class GeofenceDetailsPage {
  constructor(nav: NavController, navParams: NavParams) {
    this.nav = nav;
    this.geofence = navParams.get("geofence");
  }

  // get transitionType() {
  //   return this.geofence.transitionType.toString();
  // }

  // set transitionType(value) {
  //   this.geofence.transitionType = parseInt(value, 10);
  // }
b
  onPageLoaded() {
    this.loadMap();
  }

  loadMap() {
    this.map = Leaflet.map("map").setView([50, 50], 13);
    Leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
  }
}
