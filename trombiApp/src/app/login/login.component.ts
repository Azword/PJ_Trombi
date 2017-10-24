import {Component, OnInit} from '@angular/core';
import {GlobalVarService} from "../global";
import {RequestService} from "../request.service";

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
    this.global.actualPage = 'Login';
    document.title = this.global.titlePage + ' - ' + 'Login';
  }

  public tryConnect(): void {
    if (this.id.user === '' || this.id.pass === '') {
      this.errorMisc = true;
      this.errorMsg = 'Password or Username invalid';
      return;
    }
    this.requestService.login(this.id.user, this.id.pass).then(
      response => {
        if (response) {
          if (!(JSON.stringify(response).includes('Forbidden'))) {
            this.errorMisc = false;
            this.global.page++;
            sessionStorage.setItem('username', this.id.user);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('isLogged', 'true');
            this.global.user = this.id.user;
          }
          else {
            this.errorMisc = true;
            this.errorMsg = 'Invalid Credential';
          }
        }
      })
  }

}
