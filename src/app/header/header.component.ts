import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { SessionService } from "../core/session.service";

@Component({
    selector: "evolent-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(public sessionService: SessionService, private router: Router){}

    /**
     * logout
     */
    public logout() {
        this.sessionService.logout();
        this.router.navigate(["/login"]);
    }
}
