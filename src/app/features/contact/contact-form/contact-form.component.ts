import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9+()\-\s]{7,20}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit() {
    if (this.contactForm.valid) {
      console.log('Contact form submit', this.contactForm.value);
      alert('Thanks! We received your message (demo).');
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
