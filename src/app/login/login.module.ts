import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./login.component";

const LOGIN_ROUTES = [
    {path: "", component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(LOGIN_ROUTES),
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {}
