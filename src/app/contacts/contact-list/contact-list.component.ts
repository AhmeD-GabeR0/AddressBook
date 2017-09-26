import { ContactItemComponent } from './contact-item/contact-item.component';
import { ContactService } from './../contact.service';
import { Contact } from './../contact.model';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

    contacts: Contact[];
    subscription: Subscription;
    constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }
    ngOnInit() {
     this.subscription = this.contactService.contactChanged
      .subscribe(
        (contact: Contact[]) => {
          this.contacts = contact;
        }
      );
      this.contacts = this.contactService.getContact();
    }
    onNewContact() {
      this.router.navigate(['new'], { relativeTo: this.route} );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
