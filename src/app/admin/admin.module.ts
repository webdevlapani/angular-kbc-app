import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';


@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class AdminModule { }
