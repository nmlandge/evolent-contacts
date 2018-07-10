import { Component, TemplateRef, Input, Output, EventEmitter } from "@angular/core";

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ContactModel } from "../../models/directory.model";

@Component({
    selector: "contact-card",
    templateUrl: "./contactCard.component.html",
    styleUrls: ['./contactCard.component.scss']
})
export class ContactCardComponent {
    @Input() public contact: ContactModel;
    @Output() public deleted: EventEmitter<any> = new EventEmitter();
    @Output() public edited: EventEmitter<any> = new EventEmitter();

    public contactEditorModalRef: BsModalRef;
    public deleteConfirmationModalRef: BsModalRef;
    public newContact: ContactModel;

    constructor(private modalService: BsModalService){
        this.newContact = new ContactModel();
    }

    /**
     * openEditorModal
     */
    public openEditorModal(template: TemplateRef<any>) {
        this.newContact = new ContactModel()
        this.newContact.firstName = this.contact.firstName;
        this.newContact.lastName = this.contact.lastName;
        this.newContact.email = this.contact.email;
        this.newContact.phone = this.contact.phone;
        this.newContact.status = this.contact.status;
        this.contactEditorModalRef = this.modalService.show(template);
    }

    /**
     * openDeletorModal
     */
    public openDeletorModal(template: TemplateRef<any>) {
        this.deleteConfirmationModalRef = this.modalService.show(template);
    }

    /**
     * saveContact
     */
    public saveContact() {
        this.edited.emit(this.newContact);
        this.contactEditorModalRef.hide();
    }

    /**
     * confirmDelete
     */
    public confirmDelete() {
        this.deleted.emit(this.contact);
        this.deleteConfirmationModalRef.hide();
    }
}
