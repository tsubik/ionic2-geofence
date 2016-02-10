import { Page, NavController, NavParams } from "ionic/ionic";
import * as Leaflet from "leaflet";
import { GeofenceService } from "../../services/geofence-service";

@Page({
  templateUrl: "build/pages/geofence-details/geofence-details.html"
})
export class GeofenceDetailsPage {
  constructor(
    private nav: NavController,
    navParams: NavParams,
    private geofenceService: GeofenceService
  ) {
    this.geofenceService = geofenceService;
    this.originalGeofence = navParams.get("geofence");
    this.geofence = geofenceService.clone(this.originalGeofence);
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
    // workaround map is not correctly displayed
    // maybe this should be done in some other event
    setTimeout(this.loadMap.bind(this), 100);
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
  // TODO: Try some observables
  onMapClicked(e) {
    const latlng = e.latlng;

    this.marker.setLatLng(latlng);
    this.circle.setLatLng(latlng);
    this.geofence.latitude = latlng.lat;
    this.geofence.longitude = latlng.lng;
  }

  onMarkerPositionChanged(e) {
    const marker = e.target;
    const latlng = marker.getLatLng();

    this.circle.setLatLng(latlng);
    this.geofence.latitude = latlng.lat;
    this.geofence.longitude = latlng.lng;
  }

  saveChanges() {
    Object.assign(this.originalGeofence, this.geofence)
    this.geofenceService.addOrUpdate(this.originalGeofence).then(() => {
      this.nav.pop();
    });
  }
}
