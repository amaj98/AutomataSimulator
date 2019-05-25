import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ctrlbar',
  templateUrl: './ctrlbar.component.html',
  styleUrls: ['./ctrlbar.component.css']
})
export class CtrlbarComponent implements OnInit {

  
  
  @Input() set mode(val: string){this._currentMode = val;}
  @Output() modeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() zoom: EventEmitter<number> = new EventEmitter<number>();
  private _currentMode = 'pointer';
  constructor() { }

  get currentMode(){return this._currentMode;}
  set currentMode(val:string){this._currentMode = val; this.modeChange.emit(val);}

  onModeChange(mode){this.currentMode = mode;return false;}
  onZoom(val){this.zoom.emit(val);return false;}

  

  ngOnInit() {
  }

}
