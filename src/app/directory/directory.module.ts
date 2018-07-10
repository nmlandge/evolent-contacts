import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DirectoryComponent } from "./directory.component";
import { ContactCardComponent } from "./contactCard/contactCard.component";

const DIRECTORY_ROUTES = [
    {path: "", component: DirectoryComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DIRECTORY_ROUTES),
        FormsModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        ButtonsModule.forRoot()
    ],
    providers: [],
    declarations: [
        DirectoryComponent,
        ContactCardComponent
    ]
})
export class DirectoryModule {}
