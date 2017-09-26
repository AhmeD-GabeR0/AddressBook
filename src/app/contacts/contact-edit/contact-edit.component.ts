import { Contact } from './../contact.model';
import { Address } from './../../shared/Address.model';
import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: number;
  editmode = false;
  contactForm: FormGroup;
  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) { }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editmode = params['id'] != null;
          this.initForm();
        }
      );
  }
  onSubmit() {

    if (this.editmode) {
      this.contactService.updateContact(this.id, this.contactForm.value);
    } else {
      this.contactService.addContact(this.contactForm.value);
    }

    this.onCancel();
  }
  onAddAddress() {
    (<FormArray>this.contactForm.get('addresss')).push(
      new FormGroup({
        'streetName': new FormControl(null , Validators.required),
        'flatNum': new FormControl(null , [
          Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })

    );
  }
  onDeleteAddress(index: number) {
    (<FormArray>this.contactForm.get('addresss')).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['../'] , {relativeTo: this.route});
  }
  private initForm() {
    let contactName = '';
    let contactImagePath = '';
    let contactEmail = '';
    let contactNickName = '';
    let contactNumber = '';
    let contactGender = '';
    let contactAddress = new FormArray([]);

  if (this.editmode) {
    const contact = this.contactService.getContactIndex(this.id);
    contactName = contact.name;
    contactImagePath = contact.imagePath;
    contactNumber = contact.number;
    contactNickName = contact.nickname;
    contactGender = contact.gender;
    contactEmail = contact.email;

    if (contact['addresss']) {
      for (let address of contact.address) {
        contactAddress.push(
          new FormGroup({
            'streetName': new FormControl(address.streetName , Validators.required),
            'flatNum': new FormControl(address.flatNum, [
              Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
      }
    }
  }

  this.contactForm = new FormGroup({
    'name': new FormControl(contactName, Validators.required),
    'number': new FormControl(contactNumber , Validators.required),
    'imagePath': new FormControl(contactImagePath , Validators.required),
    'email': new FormControl(contactEmail , Validators.required),
    'nickname': new FormControl(contactNickName , Validators.required),
    'gender': new FormControl(contactGender , Validators.required),
    'addresss': contactAddress
  });
  }

}
