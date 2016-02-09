import { App, Platform } from "ionic/ionic";
import { GeofenceListPage } from "./pages/geofence-list/geofence-list";
import * as Leaflet from "leaflet";
import { GeofenceService } from "./services/geofence-service";
import GeofencePluginMock from "./services/geofence-plugin-mock";
import { FIXTURES } from "./models/geofence";

@App({
  template: `
<ion-menu [content]="content" id="leftMenu" side="left">
  <ion-toolbar>
    <ion-title>Ionic2 Geofence</ion-title>
  </ion-toolbar>
  <ion-content>
    <ion-list>
      <button ion-item (click)="addFixtures()">
        <ion-icon name="add"></ion-icon>
        Add Fixtures
      </button>
      <button ion-item (click)="removeAll()">
        <ion-icon name="trash"></ion-icon>
        Remove All Geofences
      </button>
      <button ion-item>
        <ion-icon name="checkmark"></ion-icon>
        Test Application
      </button>
      <a ion-item href="https://github.com">
        <ion-icon name="logo-github"></ion-icon>
        Source
      </a>
    </ion-list>
  </ion-content>
</ion-menu>

<ion-nav #content [root]="rootPage"></ion-nav>
`,
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
    });
  }

  addFixtures() {
    FIXTURES.forEach((fixture) => this.geofenceService.addOrUpdate(fixture));
  }

  removeAll() {
    this.geofenceService.removeAll();
  }

  testApp() {

  }
}
