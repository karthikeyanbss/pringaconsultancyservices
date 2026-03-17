import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  Firestore,
  DocumentData,
  CollectionReference
} from 'firebase/firestore';
import { environment } from '../../environments/environment';

export interface ContactSubmission extends DocumentData {
  name: string;
  email: string;
  subject?: string;
  message?: string;
  createdAt: any;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private db: Firestore;
  private contactsCollection: CollectionReference;

  constructor() {
    // Initialize Firebase
    const app = initializeApp(environment.firebase);
    
    // Initialize Cloud Firestore
    this.db = getFirestore(app);
    
    // Reference to contacts collection
    this.contactsCollection = collection(this.db, 'contactform');
  }

  /**
   * Save contact form submission to Firestore
   * @param formData Contact form data
   * @returns Promise with document ID
   */
  async saveContactSubmission(formData: {
    name: string;
    email: string;
    subject?: string;
    message?: string;
  }): Promise<string> {
    try {
      const submission: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || '',
        message: formData.message || '',
        createdAt: new Date(),
        userAgent: navigator.userAgent,
        ipAddress: '' // Will be populated server-side
      };

      const docRef = await addDoc(this.contactsCollection, submission);
      console.log('Contact submission saved with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving contact submission:', error);
      throw error;
    }
  }

  /**
   * Get Firestore instance for direct access if needed
   */
  getDb(): Firestore {
    return this.db;
  }

  /**
   * Get contacts collection reference
   */
  getContactsCollection(): CollectionReference {
    return this.contactsCollection;
  }
}
