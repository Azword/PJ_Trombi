import {Component, OnInit} from '@angular/core';
import {GlobalVarService} from "../global";
import {RequestService} from "../request.service";
import {tryCatch} from "rxjs/util/tryCatch";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public global = this.globalVar;
  public id = {"user": "", "pass": ""};
  public errorMisc: boolean = false;
  public errorMsg: String = '';

  constructor(private globalVar: GlobalVarService, private requestService: RequestService) {
  }

  ngOnInit() {
    this.global.actualPage = 'Trombinoscope';
  }

    keyDownFunction(event) {
        if(event.keyCode == 13) {
          this.tryConnect();
        }
    }

  public tryConnect(): void {
    if (this.id.user === '' || this.id.pass === '') {
      this.errorMisc = true;
      this.errorMsg = 'Password or Username invalid';
      return;
    }
    this.requestService.login(this.id.user, this.id.pass).then(
      response => {
        if (response.error !== true) {
          if (!(JSON.stringify(response).includes('Forbidden')) && response !== null) {
            this.errorMisc = false;
            this.global.page = 3;
            sessionStorage.setItem('username', this.id.user);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('isLogged', 'true');
            this.global.user = this.id.user;
          }
          else {
            this.errorMisc = true;
	    if (response.type == "error") {
		this.errorMsg = 'Error when calling AuthAPI';
	    }
	    else {
                this.errorMsg = 'Invalid Credential';
	    }
          }
        }
      })
  }

}
