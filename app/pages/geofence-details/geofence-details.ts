import { Page, NavController, NavParams, IonicApp } from "ionic/ionic";
import * as Leaflet from "leaflet";
import { GeofenceService } from "../../services/geofence-service";
import { Geofence } from "../../models/geofence";

@Page({
  templateUrl: "build/pages/geofence-details/geofence-details.html"
})
export class GeofenceDetailsPage {
  private geofence: Geofence;
  private _radius: number;
  private _latLng: any;
  private notificationText: string;
  private transitionType: string;
  private circle: any;
  private marker: any;
  private map: any;

  constructor(
    private nav: NavController,
    navParams: NavParams,
    private geofenceService: GeofenceService,
    private app: IonicApp
  ) {
    this.geofenceService = geofenceService;
    this.geofence = navParams.get("geofence");
    this.transitionType = this.geofence.transitionType.toString();
    this.notificationText = this.geofence.notification.text;
    this._radius = this.geofence.radius;
    this._latLng = Leaflet.latLng(this.geofence.latitude, this.geofence.longitude);
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
    this.circle.setRadius(value);
  }

  set latLng(value) {
    this._latLng = value;
    this.circle.setLatLng(value);
    this.marker.setLatLng(value);
  }

  get latLng() {
    return this._latLng;
  }

  onPageLoaded() {
    const menu = this.app.getComponent("leftMenu");

    menu.enable(false);
    // workaround map is not correctly displayed
    // maybe this should be done in some other event
    setTimeout(this.loadMap.bind(this), 100);
  }

  loadMap() {
    this.map = Leaflet
      .map("map")
      .setView(this.latLng, 13)
      .on("click", this.onMapClicked.bind(this))

    Leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    this.marker = Leaflet
      .marker(this.latLng, { draggable: true })
      .on("dragend", this.onMarkerPositionChanged.bind(this))
      .addTo(this.map);

    this.circle = Leaflet.circle(this.latLng, this.radius).addTo(this.map);
  }

  onMapClicked(e) {
    this.latLng = e.latlng;
  }

  onMarkerPositionChanged(e) {
    const latlng = e.target.getLatLng();

    this.latLng = latlng;
  }

  saveChanges() {
    const geofence = this.geofence;

    geofence.notification.text = this.notificationText;
    geofence.radius = this.radius;
    geofence.latitude = this.latLng.lat;
    geofence.longitude = this.latLng.lng;
    geofence.transitionType = parseInt(this.transitionType, 10);

    this.geofenceService.addOrUpdate(geofence).then(() => {
      this.nav.pop();
    });
  }
}
