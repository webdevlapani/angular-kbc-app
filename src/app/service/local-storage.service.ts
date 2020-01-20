import { Injectable } from '@angular/core';

const lifeLine = [
  {
    isUse: false,
    name: 'ગુરુજી',
    key: 'guruji',
    qid: ''
  },
  {
    isUse: false,
    name: '50-50',
    key: 'fifty',
    qid: ''
  },
  {
    isUse: false,
    name: 'સહાધ્યાયી',
    key: 'sahadhyayi',
    qid: ''
  }
];

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  localStorageConfig() {
    if (!localStorage.getItem('questions')) {
      localStorage.setItem('questions', '[]');
    }
    if (!localStorage.getItem('lifeline')) {
      localStorage.setItem('lifeline', JSON.stringify(lifeLine));
    }
  }

  getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalStorageItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
