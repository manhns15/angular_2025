import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  contacts: {
    type: string;
    value: string;
  }[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(private fb: FormBuilder) {}
  productsFrom = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.min(1)],
    category: ['', Validators.required],
    // Dynamic TAGS
    tags: this.fb.array([this.createTag()]),

    // Dynamic CONTACTS
    contacts: this.fb.array([this.createContact()]),
  });

  /* ---------- TAGS ---------- */

  createTag() {
    return this.fb.control('', Validators.required);
  }

  get tags(): FormArray {
    return this.productsFrom.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(this.createTag());
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  /* ---------- CONTACTS ---------- */

  createContact() {
    return this.fb.group({
      type: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  get contacts(): FormArray {
    return this.productsFrom.get('contacts') as FormArray;
  }

  addContact() {
    this.contacts.push(this.createContact());
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  /* ---------- SUBMIT ---------- */
  onSubmit() {
    console.log(this.productsFrom.value);
  }
}
