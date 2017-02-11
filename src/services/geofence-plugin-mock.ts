import { FIXTURES } from "../models/geofence";

export const GeofencePluginMock = {
  addOrUpdate(fences) {
    console.log("Mocked geofence plugin addOrUpdate", fences);

    return Promise.resolve();
  },
  getWatched() {
    return Promise.resolve(JSON.stringify(FIXTURES));
  },
  remove(ids) {
    console.log("Mocked geofence plugin remove", ids);

    return Promise.resolve();
  },
  removeAll() {
    console.log("Mocked geofence plugin removeAll");

    return Promise.resolve();
  },
  initialize() {
    console.log("Mocked geofence plugin initialize");

    return Promise.resolve();
  },
  onTransitionReceived() {
    console.log("Mocked geofence plugin onTransitionReceived");
  },
  onNotificationClicked() {
    console.log("Mocked geofence plugin onNotificationclicked");
  }
};

export const TransitionType = {
  ENTER: 1,
  EXIT: 2,
  BOTH: 3,
}
