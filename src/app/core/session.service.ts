import { Injectable } from "@angular/core";

import { DirectoryService } from "./directory.service";


// This service shall store user-context and current session info
@Injectable()
export class SessionService {
    private loggedIn: boolean;
    private user: {
        username: string
    } = {
        username: null
    };

    
    constructor(private directoryService: DirectoryService){}

    private cleareSessionData() {
        this.directoryService.clearDirectoryData();
        this.user.username = null;
    }

    /**
     * isSessionAlive
     * Returns whether a user is logged in or not
     * Parameters- none
     * Return- boolean
     */
    public isSessionAlive(): boolean {
        return this.loggedIn;
    }

    /**
     * login
     */
    public login(username: string, password: string) {
        if(username==="admin" && password==="pass"){
            this.user.username = username;
            this.loggedIn = true;
            return true;
        } else {
            return false;
        }
        
    }

    /**
     * logout
     */
    public logout() {
        this.cleareSessionData();
        this.loggedIn = false;
    }

    /**
     * getUserName
     */
    public getUserName(): string {
        return this.user.username;
    }
}