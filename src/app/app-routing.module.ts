import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FsmpageComponent } from './pages/fsmpage/fsmpage.component';
import { PushdownpageComponent } from './pages/pushdownpage/pushdownpage.component';
import { TuringpageComponent } from './pages/turingpage/turingpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'fsm', pathMatch: 'full' },
  { path: 'fsm', component: FsmpageComponent },
  { path: 'pushdown', component: PushdownpageComponent },
  { path: 'turing', component: TuringpageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
