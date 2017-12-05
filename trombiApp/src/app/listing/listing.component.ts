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
    public clicked = false;
    public allUsers;
    public autoComplete = {};
    public teamName = [
        {id: 1, name: "CT_ALPHA"},
        {id: 2, name: "CT_CHARLY"},
        {id: 3, name: "CT_COSI"},
        {id: 4, name: "CT_SNATCH"},
        {id: 5, name: "CT_THOR"},
        {id: 6, name: "CT_TECH"},
        {id: 7, name: "CT_KAPLA"},
        {id: 8, name: "CT_DUPLO"},
        {id: 9, name: "CT_POPA"},
        {id: 10, name: "CT_LEGO"},
        {id: 11, name: "CT_FOXTROT"}
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
		    this.getAutocomplete();
		    $('input.autocomplete').autocomplete({data: this.autoComplete});
		    console.log("sdfsdfsdfsdfsd" + this.autoComplete);
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
            this.getAutocomplete();
	    $('input.autocomplete').autocomplete(this.autoComplete);	    
        }
    }
   
    getAutocomplete() {
	for (var i = 0; i < this.allUsers.length; i++)
	{
	   this.autoComplete[this.allUsers[i].name] = null;
	}
	console.log(this.autoComplete);
    }

    myFn() {
        this.clicked = true;
    }

    public getImgBase64(s) {
        if (s) {
            return ('data:image/jpeg;base64,' + s);
        } else {
            return ('./assets/no_img.jpg');
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

