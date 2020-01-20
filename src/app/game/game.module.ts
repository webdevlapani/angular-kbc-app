import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material.module';
import { GamePageComponent } from './game-page/game-page.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [GamePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class GameModule { }
