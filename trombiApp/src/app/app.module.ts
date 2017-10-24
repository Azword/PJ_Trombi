import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { UpdaterComponent } from './updater/updater.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import {GlobalVarService} from "./global";
import {RequestService} from "./request.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {MaterializeModule} from "angular2-materialize";
import { ListingComponent } from './listing/listing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    UpdaterComponent,
    PostUpdateComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [GlobalVarService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
