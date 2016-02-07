import { Page, NavController, NavParams } from "ionic/ionic";

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
}
