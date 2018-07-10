import { Component, TemplateRef } from "@angular/core";

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { DirectoryModel, ContactModel } from "../models/directory.model";
import { DirectoryService } from "../core/directory.service";

@Component({
    selector: "directory",
    templateUrl: "./directory.component.html",
    styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
    public directory: DirectoryModel;
    public contactPage: ContactModel[];

    public contactAdderModalRef: BsModalRef;
    public contactsPerPage: number = 5;
    public currentPage: number = 1;
    public directoryFetchError: string;
    public actionError: string;
    public newContact: ContactModel;
    
    constructor(private modalService: BsModalService, private directoryService: DirectoryService){
        this.contactPage = [];
        this.newContact = new ContactModel();
    }

    ngOnInit(){
        this.directoryService.getDirectory()
        .then((directory)=>{
            this.renderDirectory(directory);
        }, (error)=>{
            this.directoryFetchError = "Something went wrong. Please contact support or try again later.";
            console.log("Failed to load contact directory: " + error.message);
        });
    }

    private renderDirectory(directory?: DirectoryModel) {
        if(directory) this.directory = directory;
        this.contactPage = this.directory.contacts.slice(0, this.contactsPerPage);
    }

    private updateContactPage(page: number, itemsPerPage: number) {
        const startItem = (page - 1) * itemsPerPage;
        const endItem = page * itemsPerPage;
        this.contactPage = this.directory.contacts.slice(startItem, endItem);
    }

    private getContactIndex(indexOnCurrentPage: number): number {
        return ((this.currentPage-1)*this.contactsPerPage)+indexOnCurrentPage;
    }

    /**
     * onPageChange
     */
    public onPageChange(event: PageChangedEvent): void {
        this.updateContactPage(event.page, event.itemsPerPage);
    }

    /**
     * openModal
     */
    public openModal(template: TemplateRef<any>) {
        this.contactAdderModalRef = this.modalService.show(template);
    }    

    public addContact(contactAdderForm) {
        if(contactAdderForm.valid)
        this.directoryService.addContact(this.newContact)
        .then(success=>{
            if(success) this.updateContactPage(this.currentPage, this.contactsPerPage);
        }, error=>{
            this.actionError = "Could not add the contact. Please try again.";
            console.log("Failed to add contact: " + error.message);
        });
        this.contactAdderModalRef.hide();
    }

    /**
     * onAddContactClicked
     */
    public onAddContactClicked(template: TemplateRef<any>) {
        this.newContact = new ContactModel();
        this.openModal(template);
    }

    /**
     * onContactDelete
     */
    public onContactDelete(contact: ContactModel, indexOnCurrentPage: number) {
        this.actionError = undefined;
        this.directoryService.deleteContact(this.getContactIndex(indexOnCurrentPage), contact)
        .then(success=>{
            if(success) this.updateContactPage(this.currentPage, this.contactsPerPage);
        }, error=>{
            this.actionError = "Could not delete the contact. Please try again.";
            console.log("Failed to delete contact: " + error.message);
        });
    }

    /**
     * onContactEdit
     */
    public onContactEdit(contact: ContactModel, indexOnCurrentPage: number) {
        this.actionError = undefined;
        this.directoryService.editContact(this.getContactIndex(indexOnCurrentPage), contact)
        .then(success=>{
            if(success) this.updateContactPage(this.currentPage, this.contactsPerPage);
        }, error=>{
            this.actionError = "Could not edit the contact. Please try again.";
            console.log("Failed to edit contact: " + error.message);
        });
    }
}
