import { App, Platform } from "ionic/ionic";
import { GeofenceListPage } from "./pages/geofence-list/geofence-list";
import * as Leaflet from "leaflet";
import { GeofenceService } from "./services/geofence-service";
import GeofencePluginMock from "./services/geofence-plugin-mock";
import { FIXTURES } from "./models/geofence";

@App({
  templateUrl: "build/app.html",
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [GeofenceService]
})
export class MyApp {
  constructor(platform: Platform, private geofenceService: GeofenceService) {
    this.rootPage = GeofenceListPage;

    platform.ready().then(() => {
      Leaflet.Icon.Default.imagePath = "img";

      if (window.geofence === undefined) {
        console.warn("Geofence Plugin not found. Using mock instead.");
        window.geofence = GeofencePluginMock;
        window.TransitionType = GeofencePluginMock.TransitionType;
      }

      window.geofence.initialize();
    );
  }

  addFixtures() {
    FIXTURES.forEach((fixture) => this.geofenceService.addOrUpdate(fixture));
  }

  removeAll() {
    this.geofenceService.removeAll();
  }

  testApp() {
    window.location.href = "cdvtests/index.html";
  }
}
