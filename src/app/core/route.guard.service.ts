import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { SessionService } from "./session.service";

// This service guards the angular-routes
@Injectable()
export class RouteGuardService implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let newUrl: string = state.url;

        return new Promise<boolean>((resolve, reject) => {
            if(newUrl !== "/login" && !this.sessionService.isSessionAlive()){
                resolve(false);
                this.router.navigate(["/login"]);
            } else {
                resolve(true);
            }
        });
    }
}