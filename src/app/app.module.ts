import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { FsmpageComponent } from './pages/fsmpage/fsmpage.component';
import { TuringpageComponent } from './pages/turingpage/turingpage.component';
import { PushdownpageComponent } from './pages/pushdownpage/pushdownpage.component';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    FsmpageComponent,
    TuringpageComponent,
    PushdownpageComponent,
    ControlBarComponent,
    CanvasComponent,
    FsmpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
