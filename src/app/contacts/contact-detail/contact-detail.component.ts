import { ContactService } from './../contact.service';
import { Contact } from './../contact.model';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: number;
  constructor(private contactService: ContactService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.contact = this.contactService.getContactIndex(this.id);
      }
    );

  }

  onEditContact() {
    this.router.navigate(['edit'], { relativeTo: this.route} );
    // or
  //  this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route} );
  }
  onDeleteContact() {
    this.contactService.deleteContact(this.id);
    this.router.navigate(['/contacts']);
  }

}
