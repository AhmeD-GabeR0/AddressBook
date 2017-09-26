import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedcontact: Contact;
  constructor(private ContactService: ContactService) { }

  ngOnInit() {
    this.ContactService.contactSelected
    .subscribe(
      (contact: Contact) => {
        this.selectedcontact = contact;
      }
    );
  }

}
