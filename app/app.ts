import { App, IonicApp, Platform, Alert } from "ionic-angular";
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
  rootPage: any = GeofenceListPage;

  constructor(
    platform: Platform,
    private app: IonicApp,
    private geofenceService: GeofenceService
  ) {
    platform.ready().then(() => {
      Leaflet.Icon.Default.imagePath = "img";

      if (window.geofence === undefined) {
        console.warn("Geofence Plugin not found. Using mock instead.");
        window.geofence = GeofencePluginMock;
        window.TransitionType = GeofencePluginMock.TransitionType;
      }

      window.geofence.initialize();
    });
  }

  addFixtures() {
    FIXTURES.forEach((fixture) => this.geofenceService.addOrUpdate(fixture));
    this.app.getComponent("leftMenu").close();
  }

  removeAll() {
    const confirm = Alert.create({
      title: "Are you sure?",
      message: "Are you sure you want to remove all geofences?",
      buttons: [
        { text: "No" },
        {
          text: "Yes",
          handler: () => {
            this.geofenceService.removeAll();
          },
        },
      ],
    });

    this.app.getComponent("leftMenu").close();
    this.app.getComponent("nav").present(confirm);
  }

  testApp() {
    const confirm = Alert.create({
      title: "Are you sure?",
      message: "Running tests will remove all your geofences. Do you want to continue?",
      buttons: [
        { text: "No" },
        {
          text: "Yes",
          handler: () => {
            window.location.href = "cdvtests/index.html";
          },
        },
      ],
    });

    this.app.getComponent("leftMenu").close();
    this.app.getComponent("nav").present(confirm);
  }
}
