import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent {

  @Input() isValid = false;
  @Input() set mode(val) { this.currentMode1 = val; }
  @Output() modeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() zoom: EventEmitter<number> = new EventEmitter<number>();

  private currentMode1 = 'pointer';
  get currentMode() { return this.currentMode1; }
  set currentMode(val: string) { this.currentMode1 = val; this.modeChange.emit(val); }
  constructor() { }

  // property click event handlers

  // surface click event handlers

  // controlbar click event handlers
  onModeChange(mode) {
    this.currentMode = mode;
    return false;
  }
  onNew() {
    return false;
  }
  onLoad() {
    return false;
  }
  onSave() {
    return false;
  }
  onExport() {
    return false;
  }
  onZoom(direction) { this.zoom.emit(direction); return false; }
}
