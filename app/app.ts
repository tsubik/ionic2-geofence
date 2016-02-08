import { App, Platform } from "ionic/ionic";
import { GeofenceListPage } from "./pages/geofence-list/geofence-list";
import * as Leaflet from "leaflet";
import { GeofenceService } from "./services/geofence-service";
import GeofencePluginMock from "./services/geofence-plugin-mock";

@App({
  template: "<ion-nav [root]='rootPage'></ion-nav>",
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [GeofenceService]
})
export class MyApp {
  constructor(platform: Platform) {
    this.rootPage = GeofenceListPage;

    platform.ready().then(() => {
      Leaflet.Icon.Default.imagePath = "img";

      if (window.geofence === undefined) {
        console.warn("Geofence Plugin not found. Using mock instead.");
        window.geofence = GeofencePluginMock;
        window.TransitionType = GeofencePluginMock.TransitionType;
      }
    });
  }
}
