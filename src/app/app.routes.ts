import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { RouteGuardService } from "./core/route.guard.service";

const appRoutes: Routes = [
    {
        path: "login",
        loadChildren: "./login/login.module#LoginModule",
        canActivate: [RouteGuardService],
    }, {
        path: "directory",
        loadChildren: "./directory/directory.module#DirectoryModule",
        canActivate: [RouteGuardService],
    }, {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    }
];

export const AppRoutes = RouterModule.forRoot(
    appRoutes, 
    { useHash: true, preloadingStrategy: PreloadAllModules }
);
