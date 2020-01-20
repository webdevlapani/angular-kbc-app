import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../service/local-storage.service';
import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

interface IQuestion {
  name: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  ans: string;
  rs: number;
  id: number;
  isTrue: boolean;
  isAnswer: string;
}
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: IQuestion = {
    name: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    ans: '',
    id: 0,
    rs: null,
    isTrue: false,
    isAnswer: '',
  };
  allQuestion;
  displayedColumns: string[] = ['id', 'name', 'optionA', 'optionB', 'optionC', 'optionD', 'ans', 'rs'];
  dataSource = new MatTableDataSource<IQuestion>(this.ls.getLocalStorageItem('questions'));

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private ls: LocalStorageService) { }

  ngOnInit() {
    this.allQuestion = this.ls.getLocalStorageItem('questions');
  }

  addQuestion() {
    const questions = this.ls.getLocalStorageItem('questions');
    const alloption = ['optionA', 'optionB', 'optionC', 'optionD'];
    const isUnique = Object.keys(this.question).filter(item => alloption.includes(item)).map(item => this.question[item]);
    if (Array.from(new Set(isUnique)).length < 4) {
      alert('Please add unique option');
      return false;
    }
    questions.push({...this.question, id: +new Date()});
    this.ls.setLocalStorageItem('questions', questions);
    this.dataSource = new MatTableDataSource<IQuestion>(this.ls.getLocalStorageItem('questions'));
  }

  resetGame() {
    this.ls.clearLocalStorage();
    this.ls.localStorageConfig();
    this.dataSource = new MatTableDataSource<IQuestion>(this.ls.getLocalStorageItem('questions'));
  }
}
