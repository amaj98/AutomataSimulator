import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fsmpage',
  templateUrl: './fsmpage.component.html',
  styleUrls: ['./fsmpage.component.css']
})
export class FsmpageComponent implements OnInit {
  tabs: string[] = ['Edit','Info','Determinism','Simulate','Examples'];
  currtab = this.tabs[0];
  constructor() { }

  ngOnInit() {
  }

}
