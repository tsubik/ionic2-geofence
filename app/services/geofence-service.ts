import { Injectable } from "@angular/core";
import generateUUID from "../utils/uuid";

@Injectable()
export class GeofenceService {
  private geofences: Geofence[];

  create(attributes) {
    const defaultGeofence = {
      id: generateUUID(),
      latitude: 50,
      longitude: 50,
      radius: 1000,
      transitionType: window.TransitionType.ENTER,
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

  clone(geofence: Geofence) {
    return JSON.parse(JSON.stringify(geofence));
  }

  addOrUpdate(geofence: Geofence) {
    return window.geofence.addOrUpdate(geofence)
      .then(() => this.findById(geofence.id))
      .then((found) => {
        if (!found) {
          this.geofences.push(geofence);
        } else {
          const index = this.geofences.indexOf(found);

          this.geofences[index] = geofence;
        }
      });
  }

  findAll() {
    return window.geofence.getWatched()
      .then((geofencesJson) => {
        const geofences = JSON.parse(geofencesJson);

        this.geofences = geofences;
        return geofences;
      });
  }

  findById(id) {
    const found = this.geofences.filter(g => g.id === id);

    if (found.length > 0) {
      return found[0];
    }

    return undefined;
  }

  removeAll() {
    return window.geofence.removeAll().then(() => {
      this.geofences.length = 0;
    });
  }

  remove(geofence) {
    return window.geofence.remove(geofence.id).then(() => {
      this.geofences.splice(this.geofences.indexOf(geofence), 1);
    });
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
