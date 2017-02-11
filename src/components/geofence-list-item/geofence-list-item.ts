import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GeofenceService } from "../../services/geofence-service";

/*
 Generated class for the GeofenceListItem component.

 See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
  selector: "geofence-list-item",
  templateUrl: "geofence-list-item.html"
})
export class GeofenceListItem {
  @Input() geofence: Geofence;
  @Output() onItemTapped: EventEmitter<any> = new EventEmitter();

  constructor(private geofenceService: GeofenceService) {

  }

  get header() {
    return this.geofence.notification.text;
  }

  get details() {
    return `When ${this.transitionTypeText} within ${this.geofence.radius}m`;
  }

  get transitionTypeText() {
    switch(this.geofence.transitionType) {
      case 1: return "entering region";
      case 2: return "exiting region";
      case 3: return "entering or exiting region";
    }
  }

  itemTapped() {
    this.onItemTapped.emit(null);
  }

  remove() {
    this.geofenceService.remove(this.geofence);
  }
}
