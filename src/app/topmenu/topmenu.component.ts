import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  title = 'Automata Simulator';
  tabs = [['FSM','fsm'],['Pushdown','pushdown'],['Turing Machine','turing']];

  constructor() { }

  ngOnInit() {
  }

}
