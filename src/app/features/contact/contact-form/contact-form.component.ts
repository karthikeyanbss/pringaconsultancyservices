import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../../core/firestore.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitError = '';
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.minLength(10)]]
    });
  }

  submit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      this.submitSuccess = false;

      this.firestoreService
        .saveContactSubmission(this.contactForm.value)
        .then((docId) => {
          console.log('Form saved successfully with ID:', docId);
          this.submitSuccess = true;
          this.isSubmitting = false;
          
          // Show success message
          alert('Thanks! We received your message. Our team will get back to you soon!');
          
          // Reset form
          this.contactForm.reset();
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          this.submitError = 'Failed to submit form. Please try again later.';
          this.isSubmitting = false;
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
