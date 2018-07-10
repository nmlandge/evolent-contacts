import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

// This service shall define all the API calls to directory server
@Injectable()
export class ApiService {
    private dummyDirectoryResponse = {
        directory: {
            contacts: [{
                id: "1a",
                firstName: "Jordan",
                lastName: "Pickford",
                email: "jordan@efa.com",
                phone: "9988776655",
                status: "ACTIVE"
            }, {
                id: "2a",
                firstName: "Kyle",
                lastName: "Walker",
                email: "walker@efa.com",
                phone: "9887655432",
                status: "INACTIVE"
            }, {
                id: "2b",
                firstName: "John",
                lastName: "Stones",
                email: "stones@efa.com",
                phone: "9878767656",
                status: "ACTIVE"
            }, {
                id: "2c",
                firstName: "Harry",
                lastName: "Maguire",
                email: "maguire@efa.com",
                phone: "9876876576",
                status: "ACTIVE"
            }, {
                id: "3a",
                firstName: "James",
                lastName: "Henderson",
                email: "henderson@efa.com",
                phone: "9876587654",
                status: "ACTIVE"
            }, {
                id: "4a",
                firstName: "Kieran",
                lastName: "Trippier",
                email: "trippier@efa.com",
                phone: "9876548765",
                status: "INACTIVE"
            }, {
                id: "4b",
                firstName: "Jesse",
                lastName: "Lingard",
                email: "lingard@efa.com",
                phone: "9876543876",
                status: "ACTIVE"
            }, {
                id: "4c",
                firstName: "Bamidele",
                lastName: "Alli",
                email: "dele@efa.com",
                phone: "9876543287",
                status: "ACTIVE"
            }, {
                id: "4d",
                firstName: "Ashley",
                lastName: "Young",
                email: "young@efa.com",
                phone: "9876543218",
                status: "ACTIVE"
            }, {
                id: "5a",
                firstName: "Raheem",
                lastName: "Sterling",
                email: "sterling@efa.com",
                phone: "9876543219",
                status: "INACTIVE"
            }, {
                id: "5b",
                firstName: "Harry",
                lastName: "Kane",
                email: "kane@efa.com",
                phone: "9998887776",
                status: "ACTIVE"
            }]
        }
    };

    constructor(private http: HttpClient){}

    /**
     * getDirectory
     */
    public getDirectory(): Promise<any> {
        // return this.http.get("/api/directory").toPromise();
        return Promise.resolve(this.dummyDirectoryResponse);
    }

    /**
     * postContact
     */
    public postContact(contact: Object): Promise<any> {
        // return this.http.post("/api/directory/contact", contact).toPromise();
        return Promise.resolve({ contact: contact });
    }

    /**
     * putContact
     */
    public putContact(contactId: string, contact: Object): Promise<any> {
        // return this.http.put("/api/directory/contact/"+contactId, contact).toPromise();
        return Promise.resolve({ contact: contact });
    }

    /**
     * deleteContact
     */
    public deleteContact(contactId: string): Promise<any> {
        // return this.http.delete("/api/directory/contact/"+contactId).toPromise();
        return Promise.resolve({ contactId: contactId });
    }
}