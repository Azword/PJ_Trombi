import {Component, OnInit} from '@angular/core';
import {GlobalVarService} from "../global";
import {RequestService} from "../request.service";
import {isUndefined} from "util";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  public global = this.globalVar;
  public allUsers;
  public teamName = [
    {id: 1, name: "CT_ALPHA"},
    {id: 2, name: "CT_BRAVO"},
    {id: 3, name: "CT_CHARLIE"},
    {id: 4, name: "CT_DELTA"},
    {id: 5, name: "CT_POPA"},
    {id: 6, name: "CT_FOXTROT"},
    {id: 7, name: "CT_LEGO"},
    {id: 8, name: "CT_KAPLA"},
    {id: 9, name: "DT_BOM"}
  ];

  constructor(private globalVar: GlobalVarService, public requestService: RequestService) {
  }

  ngOnInit() {
    this.global.actualPage = 'Trombinoscope';

    $(document).ready(function () {
      $('.collapsible').collapsible({
        accordion: true
      });
    });
    if (navigator.onLine) {
      this.requestService.getAll().then(
        success => {
          this.allUsers = success.data;
          console.log("OnlineUsers : " + this.allUsers.length);
          },
        error => {
          console.log(error);
        }
      )
    }
    else {
      this.allUsers = JSON.parse(localStorage.getItem('data'));
      if (!this.allUsers) {
        this.global.page = 4;
        this.global.errorUpdate = true;
      }
      this.allUsers = this.allUsers.data;
      console.log("OfflineUsers : " + this.allUsers.length);
    }
  }

  getNbrMembers(ctName) {
    var nbr = 0;
    if (!isUndefined(ctName) && !isUndefined(this.allUsers)) {
      for (let single of this.allUsers) {
        if (single.team === ctName) {
          nbr++;
        }
        if (ctName === "Undefined") {
          if (single.team === "") {
            nbr++;
          }
        }
      }
    }
    return (nbr);
  }
}

