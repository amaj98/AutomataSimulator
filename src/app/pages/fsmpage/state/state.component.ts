import { FsmEvent } from '../fsmevent';
import { FsmState } from '../fsmobject';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {

  // Input variables
  @Input() radius: number;
  @Input() state: FsmState;
  @Input() selected: boolean;
  @Output() click: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mousedown: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mouseup: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  @Output() mousemove: EventEmitter<FsmEvent> = new EventEmitter<FsmEvent>();
  constructor() { }

  onClick(evt){
    this.mousemove.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseDown(evt) {
    this.mousedown.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseUp(evt) {
    this.mouseup.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
  onMouseMove(evt) {
    this.mousemove.emit({ srcElement: this.state, srcEvent: evt });
    evt.stopPropagation();
    return false;
  }
}
