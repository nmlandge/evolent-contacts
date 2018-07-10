import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { SessionService } from "../core/session.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public username = "";
    public password = "";
    public errorMessage = "";

    constructor(private sessionService: SessionService, private router: Router){}

    public login(){
        this.errorMessage = "";
        if(this.sessionService.login(this.username, this.password)){
            this.router.navigate(["/directory"]);
        } else {
            this.errorMessage = "Invalid Username/Password";
        }
    }
}
