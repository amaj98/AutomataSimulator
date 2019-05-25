import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Fsm, FsmState, FsmObject, FsmTransition } from '../Fsm';

@Component({
  selector: 'app-drawfsm',
  templateUrl: './drawfsm.component.html',
  styleUrls: ['./drawfsm.component.css']
})
export class DrawfsmComponent implements OnInit {

  @ViewChild('canvasSVG') svg: ElementRef;

  private selected: FsmObject = null;
  private _mode = 'pointer';
  private fsm: Fsm = new Fsm();
  private radius = 30;
  private fontsize = 15;
  private zoom = 0;
  private held = false;
  
  constructor(){ }

  get mode(){return this._mode;}
  set mode(val:string){this._mode = val;}
  ngOnInit(){

  }
  onZoom($event){
    if($event === 0){this.zoom = 0;}
    else{this.zoom+=$event;}
  }

  onClickCanvas(evt){
    if(this.mode === 'pointer'){
     
    }
    else if(this.mode === 'state'){
      const pt = this.clientToSurface(evt.x, evt.y);
      this.selected = this.fsm.addNewState(pt.x, pt.y);
      this.mode ='pointer';
    }
    else if(this.mode === 'transition'){
      //add trans
      this.mode = 'pointer';
    }
  }

  onClickState(evt,state){
    if(this.mode === 'pointer'){
      this.selected = state;
      this.held = true;
    }
  }

  onMouseUp(evt){
    this.held = false;
  }

  onMouseMove(evt){
    
    if(this.held){
      if(this.isState()){
        let moving = this.selected as FsmState;
        moving.position = this.clientToSurface(evt.x, evt.y);
        
      }
    }
  }

  isState(){
    return this.selected instanceof FsmState;
  }
  isTrans(){
    return this.selected instanceof FsmTransition;
  }

  private clientToSurface = (x: number, y: number) => {
    const pt = this.svg.nativeElement.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(this.svg.nativeElement.getScreenCTM().inverse());
  }
}
