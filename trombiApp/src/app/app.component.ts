import {Component, OnInit} from '@angular/core';
import {GlobalVarService} from "./global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public global = this.globalVar;

  ngOnInit() {
  }

  constructor(private globalVar: GlobalVarService) {
  }


}
