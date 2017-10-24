import { Injectable } from '@angular/core'

@Injectable()
export class GlobalVarService {
  public page = 1;
  public errorUpdate: boolean = false;
  public bruteForce: boolean = false;

  public actualPage: string = '';
  public user: string = '';
  public titlePage: string = document.title;
}
