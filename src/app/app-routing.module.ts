import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent} from './admin/question/question.component';
import {GamePageComponent} from './game/game-page/game-page.component';


const routes: Routes = [
  { path: 'question', component: QuestionComponent },
  { path: 'gameQuestion', component: GamePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
