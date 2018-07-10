import { Injectable } from "@angular/core";

import { UtilityService } from "./utility.service";
import { ApiService } from "./api.service";
import { DirectoryModel, ContactModel } from "../models/directory.model";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class DirectoryService {
    private directory: DirectoryModel;

    constructor(private apiService: ApiService){}

    /**
     * clearDirectoryData
     */
    public clearDirectoryData() {
        this.directory = undefined;
    }

    /**
     * updateDirectoryData
     */
    public updateDirectoryData(): Promise<any> {
        return this.apiService.getDirectory()
        .then((response: HttpResponse<DirectoryModel>)=>{
            this.directory = UtilityService.deserialize(DirectoryModel, response["directory"]);
            return this.directory;
        }, (errorResponse: HttpErrorResponse)=>{
            throw errorResponse;
        });
    }

    /**
     * getDirectory
     */
    public getDirectory(): Promise<any> {
        if(this.directory){
            return Promise.resolve(this.directory);
        } else {
            return this.updateDirectoryData()
            .then((directory: DirectoryModel)=>{
                return directory;
            }, (errorResponse: HttpErrorResponse)=>{
                throw errorResponse;
            });
        }
    }

    /**
     * addContact
     */
    public addContact(newContact: ContactModel): Promise<any> {
        return this.apiService.postContact(newContact)
        .then((response: HttpResponse<any>)=>{
            this.directory.contacts.push(newContact);
            return true;
        }, (errorResponse: HttpErrorResponse)=>{
            throw errorResponse;
        });
    }

    /**
     * editContact
     */
    public editContact(contactIndex: number, editedContact: ContactModel): Promise<any> {
        return this.apiService.putContact(editedContact.id, editedContact)
        .then((response: HttpResponse<any>)=>{
            this.directory.contacts[contactIndex] = editedContact;
            return true;
        }, (errorResponse: HttpErrorResponse)=>{
            throw errorResponse;
        });
    }

    /**
     * deleteContact
     */
    public deleteContact(contactIndex: number, contact: ContactModel): Promise<any> {
        return this.apiService.deleteContact(contact.id)
        .then((response: HttpResponse<any>)=>{
            this.directory.contacts.splice(contactIndex, 1);
            return true;
        }, (errorResponse: HttpErrorResponse)=>{
            throw errorResponse;
        });
    }
}
