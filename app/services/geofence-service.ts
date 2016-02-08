import { Injectable } from "angular2/core";

const FIXTURES = [
  { id: 1, latitude: 50.3021079, longitude: 18.6771861, radius: 3000, transitionType: 1, notification: { text: "Gliwice Train Station"} },
  { id: 2, latitude: 50.4728049, longitude: 19.0736874, radius: 3000, transitionType: 1, notification: { text: "Pyrzowice Airport"} },
  { id: 3, latitude: 50.0671974, longitude: 19.945232, radius: 3000, transitionType: 1, notification: { text: "Cracow Main Station"} },
  { id: 4, latitude: 52.2287803, longitude: 21.001124, radius: 3000, transitionType: 1, notification: { text: "Warsaw Main Station"} },
  { id: 5, latitude: 40.7257093, longitude: -74.0032786, radius: 4000, transitionType: 3, notification: { text: "New York - SOHO"} },
  { id: 6, latitude: 34.0033907, longitude: -118.5069657, radius: 3000, transitionType: 2, notification: { text: "LA - Santa Monica State Beach"} },
  { id: 7, latitude: 25.8938595, longitude: -80.1330216, radius: 500, transitionType: 1, notification: { text: "Dexter's Apartment - Miami Bay Harbour" } },
];

@Injectable()
export class GeofenceService {
  private geofences: any[]

  constructor() {
    this.geofences = FIXTURES;
  }

  create(attributes) {
    const defaultGeofence = {
      id: this.generateId(),
      latitude: 50,
      longitude: 50,
      radius: 1000,
      transitionType: TransitionType.ENTER,
      notification: {
        id: this.getNextNotificationId(),
        title: "Ionic geofence example",
        text: "",
        icon: "res://ic_menu_mylocation",
        openAppOnClick: true,
      },
    };

    return Object.assign(defaultGeofence, attributes);
  }

  findAll() {
    return Promise.resolve(this.geofences);
  }

  private generateId() {
    var d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);

      return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  private getNextNotificationId() {
    var max = 0;

    this.geofences.forEach(function (gf) {
      if (gf.notification && gf.notification.id) {
        if (gf.notification.id > max) {
          max = gf.notification.id;
        }
      }
    });

    return max + 1;
  }
}
