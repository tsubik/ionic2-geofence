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

  get transitionType() {
    return this.geofence.transitionType.toString();
  }

  set transitionType(value) {
    this.geofence.transitionType = parseInt(value, 10);
  }

  get radius() {
    return this.geofence.radius;
  }

  set radius(value) {
    this.geofence.radius = value;
    this.circle.setRadius(value);
  }

  onPageLoaded() {
    this.loadMap();
  }

  loadMap() {
    this.map = Leaflet
      .map("map")
      .locate({setView: true, maxZoom: 16})
      .on("click", this.onMapClicked.bind(this))
      .on("locationfound", this.onLocationFound.bind(this))
      .on("locationerror", this.onLocationError.bind(this));

    Leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
  }

  onLocationFound(e) {
    this.marker = Leaflet.marker(e.latlng).addTo(this.map);
    this.circle = Leaflet.circle(e.latlng, this.geofence.radius).addTo(this.map);
  }

  onLocationError(e) {
    console.log("Error: ", e.message);
  }

  onMapClicked(e) {

  }
}
