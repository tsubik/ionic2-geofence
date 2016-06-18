import { Component, ViewChild } from "@angular/core";
import { ionicBootstrap, Nav, Platform, Alert, MenuController } from "ionic-angular";
import { GeofenceListPage } from "./pages/geofence-list/geofence-list";
import * as Leaflet from "leaflet";
import { GeofenceService } from "./services/geofence-service";
import GeofencePluginMock from "./services/geofence-plugin-mock";
import { FIXTURES } from "./models/geofence";

@Component({
  templateUrl: "build/app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GeofenceListPage;

  constructor(
    platform: Platform,
    private geofenceService: GeofenceService,
    private menu: MenuController
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
    this.menu.close();
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

    this.menu.close();
    this.nav.present(confirm);
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

    this.menu.close();
    this.nav.present(confirm);
  }
}

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/

ionicBootstrap(MyApp, [GeofenceService], {});
