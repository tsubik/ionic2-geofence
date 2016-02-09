import { FIXTURES } from "../models/geofence";

export default {
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
  receiveTransition() {},
  TransitionType: {
    ENTER: 1,
    EXIT: 2,
    BOTH: 3,
  },
};
