import "reflect-metadata";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutes } from "./app.routes";

import { RouteGuardService } from "./core/route.guard.service";
import { ApiService } from "./core/api.service";
import { SessionService } from "./core/session.service";
import { UtilityService } from "./core/utility.service";
import { DirectoryService } from "./core/directory.service";

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
      AppComponent,
      HeaderComponent
  ],
  imports: [
      BrowserModule,
      AppRoutes,
      HttpClientModule
  ],
  providers: [
      RouteGuardService,
      ApiService,
      SessionService,
      UtilityService,
      DirectoryService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
