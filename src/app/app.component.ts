import { Component } from '@angular/core';
import {LocalStorageService} from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private ls: LocalStorageService) {
    ls.localStorageConfig();
  }
}
