import { Contact } from './../../contact.model';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}

