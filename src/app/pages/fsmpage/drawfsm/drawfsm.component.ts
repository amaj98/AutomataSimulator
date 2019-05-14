import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fsm, FsmState, FsmObject, FsmTransition } from '../Fsm';

@Component({
  selector: 'app-drawfsm',
  templateUrl: './drawfsm.component.html',
  styleUrls: ['./drawfsm.component.css']
})
export class DrawfsmComponent implements OnInit {

  private selected: FsmObject = null;
  private _mode = 'pointer';
  private zoom = 0;
  
  constructor(){ }

  get mode(){return this._mode;}
  set mode(val:string){this._mode = val;}
  ngOnInit(){

  }
  onZoom($event){
    if($event === 0){this.zoom = 0;}
    else{this.zoom+=$event;}
  }

  isState(){
    return this.selected instanceof FsmState;
  }
  isTrans(){
    return this.selected instanceof FsmTransition;
  }
}
