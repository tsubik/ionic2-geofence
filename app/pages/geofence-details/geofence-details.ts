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
    const latlng = Leaflet.latLng(this.geofence.latitude, this.geofence.longitude);

    this.map = Leaflet
      .map("map")
      .setView(latlng, 13)
      .on("click", this.onMapClicked.bind(this))

    Leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
    this.marker = Leaflet
      .marker(latlng, { draggable: true })
      .on("dragend", this.onMarkerPositionChanged.bind(this))
      .addTo(this.map);
    this.circle = Leaflet.circle(latlng, this.geofence.radius).addTo(this.map);
  }

  onMapClicked(e) {

  }

  onMarkerPositionChanged(e) {
    const marker = e.target;

    this.circle.setLatLng(marker.getLatLng());
  }
}
