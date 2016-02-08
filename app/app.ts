import { App, Platform } from "ionic/ionic";
import { GeofenceListPage } from "./pages/geofence-list/geofence-list";
import * as Leaflet from "leaflet";

@App({
  template: "<ion-nav [root]='rootPage'></ion-nav>",
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  constructor(platform: Platform) {
    this.rootPage = GeofenceListPage;

    platform.ready().then(() => {
      Leaflet.Icon.Default.imagePath = "img";
    });
  }
}
