import { JsonProperty } from "../core/custom.decorators";
import { ContactStatus } from "./enums";

export class ContactModel {
    id: string = undefined;
    firstName: string = undefined;
    lastName: string = undefined;
    email: string = undefined;
    phone: string = undefined;
    status: ContactStatus = undefined;
    
    constructor(){
        this.status = "INACTIVE";
    }
}

export class DirectoryModel {
    @JsonProperty({ clazz: ContactModel }) contacts: ContactModel[] = undefined;
    
    constructor(){
        this.contacts = [];
    }
}
