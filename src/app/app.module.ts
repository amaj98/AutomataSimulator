import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { FsmpageComponent } from './pages/fsmpage/fsmpage.component';
import { TuringpageComponent } from './pages/turingpage/turingpage.component';
import { PushdownpageComponent } from './pages/pushdownpage/pushdownpage.component';
import { DrawfsmComponent } from './pages/fsmpage/drawfsm/drawfsm.component';
import { CtrlbarComponent } from './pages/fsmpage/ctrlbar/ctrlbar.component';
import { CanvasComponent } from './pages/fsmpage/canvas/canvas.component';
import { StateComponent } from './pages/fsmpage/state/state.component';
import { TransitionComponent } from './pages/fsmpage/transition/transition.component';

@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    FsmpageComponent,
    TuringpageComponent,
    PushdownpageComponent,
    DrawfsmComponent,
    CtrlbarComponent,
    CanvasComponent,
    StateComponent,
    TransitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
