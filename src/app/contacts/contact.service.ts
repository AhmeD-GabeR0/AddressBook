import { Address } from './../shared/Address.model';
import { Contact } from './contact.model';
import {Injectable, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ContactService {
  contactSelected = new EventEmitter<Contact>();
  contactChanged = new Subject<Contact[]>();
     private contacts: Contact[] = [
      new Contact('Ahmed', '201090416555',
       'https://thumbs.dreamstime.com/z/contacte-nos-%C3%ADcone-no-fundo-branco-29710783.jpg', 'Ahmed@gmail.com', 'Zollk', 'Male',[
        new Address('alhay.st', 25),
      ]),
      new Contact('Ali', '2010516555',
       'https://thumbs.dreamstime.com/z/contacte-nos-%C3%ADcone-no-fundo-branco-29710783.jpg', 'ali@gmail.com', 'alinho', 'Male',
      [
        new Address('milano.st', 23),
        new Address('milano.st', 23)
      ])
    ];

  constructor() { }

  getContact() {
    return this.contacts.slice(); // to create a new copy of the array of contacts so that when we change
    // it not changed the Contacts array in contact service
   }
   getContactIndex(index: number) {
     return this.contacts[index];
   }

   addContact(contact: Contact) {
     this.contacts.push(contact);
     this.contactChanged.next(this.contacts.slice());
   }
   updateContact(index: number , newContact: Contact) {
     this.contacts[index] = newContact;
     this.contactChanged.next(this.contacts.slice());

   }
   deleteContact(index: number) {
     this.contacts.splice(index, 1);
     this.contactChanged.next(this.contacts.slice());
   }

}
