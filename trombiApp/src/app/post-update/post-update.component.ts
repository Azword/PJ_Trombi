import { Component, OnInit } from '@angular/core';
import {GlobalVarService} from "../global";

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {
  public global = this.globalVar;

  constructor(private globalVar: GlobalVarService) { }

  ngOnInit() {
    this.global.actualPage = 'Post-Update';
    document.title = this.global.titlePage + ' - ' + 'Post-Update';
  }

  public tryAgain(): void {
    this.global.page = 1;
    this.global.errorUpdate = false;
  }

}
