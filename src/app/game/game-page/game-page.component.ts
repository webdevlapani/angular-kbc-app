import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../service/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  lifeLine;
  allQuestion;
  question;
  showResult;
  showResultButton;
  currentQuestion = 0;
  winPoint = 0;
  totalPoint = 0;
  isTrue = {
    optionA: false,
    optionB: false,
    optionC: false,
    optionD: false
  }
  hideOption = [];
  constructor(private ls: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // this.currentQuestion = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }
  loadData() {
    this.lifeLine = this.ls.getLocalStorageItem('lifeline');
    this.allQuestion = this.ls.getLocalStorageItem('questions');
    this.totalPoint = this.allQuestion.reduce((point, currentValue) => point + currentValue.rs, 0);
    const isContinue = this.allQuestion.findIndex( question => question.isAnswer === '');
    if (isContinue >= 0) {
      this.currentQuestion = isContinue;
      this.winPoint = this.allQuestion.reduce((point, currentValue) => point + currentValue.isTrue ? currentValue.rs : 0, 0);
    } else {
      this.showResult = true;
      this.winPoint = this.allQuestion.reduce((point, currentValue) => point + currentValue.isTrue ? currentValue.rs : 0, 0);
    }
    if (this.allQuestion.length - 1 === this.currentQuestion ) {
      this.showResultButton = true;
    }
    this.question = {... this.allQuestion[isContinue]};
  }

  onLifeLine(ll) {
    // const lifeLine = this.ls.getLocalStorageItem('lifeline');
    const foundIndex = this.lifeLine.findIndex(item => item.key === ll.key);
    if (foundIndex >= 0) {
      this.lifeLine[foundIndex].isUse = true;
      this.lifeLine[foundIndex].qid = this.currentQuestion;
      const allOption = ['optionA', 'optionB', 'optionC', 'optionD'];
      allOption.splice(allOption.findIndex(item => item === this.question.ans), 1);
      allOption.splice(Math.floor(Math.random() * 3), 1);
      this.hideOption = allOption;
      // typeof (this.hideOption);
      this.ls.setLocalStorageItem('lifeline', this.lifeLine );
    } else {
      alert( 'Life line already used' );
    }
  }

  onNextQuestion() {
    this.currentQuestion++;
    this.question = this.allQuestion[this.currentQuestion];
    // console.log(this.allQuestion.length , this.currentQuestion - 1)
    if (this.allQuestion.length - 1 === this.currentQuestion ) {
      this.showResultButton = true;
    }
  }

  onAnswerClick(ans) {
    if (this.question.isAnswer === '') {
      if (this.question.ans === ans) {
        this.question.isTrue = true;
        this.winPoint += this.question.rs;
      }
      this.question.isAnswer = ans;
      // tslint:disable-next-line:radix
      this.allQuestion[this.currentQuestion] = {...this.question};
      this.ls.setLocalStorageItem('questions', this.allQuestion);
    }
  }

  onRestart() {
    this.allQuestion.forEach((item, index) => {
      this.allQuestion[index].isTrue = false;
      this.allQuestion[index].isAnswer = '';
    });
    this.currentQuestion = 1;
    this.showResult = false;
    this.showResultButton = false;

    this.ls.setLocalStorageItem('questions', this.allQuestion);
    this.loadData();

  }

  displayResult() {
    this.showResult = true;
  }
}
