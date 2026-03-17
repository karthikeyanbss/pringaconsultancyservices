# Firebase Integration Setup for Pringa Consultancy Services

## Overview
This document outlines the Firebase Firestore integration for the contact form submission and email notification system.

## Firestore Collection Structure

### Collection: `contactform`

Each document in the `contactform` collection contains the following fields:

```
{
  name: string (required)
    - User's full name
    - Minimum 2 characters
    
  email: string (required)
    - User's email address
    - Valid email format required
    
  subject: string (optional)
    - Subject of the inquiry
    
  message: string (optional)
    - Detailed message or project description
    - Minimum 10 characters if provided
    
  createdAt: timestamp
    - Automatically set to current date/time when submitted
    - Used for sorting and filtering submissions
    
  userAgent: string (optional)
    - Browser/device information for debugging
    
  ipAddress: string (optional)
    - User's IP address (populated server-side via Cloud Function)
    
  processed: boolean (optional, default: false)
    - Tracks whether email notification has been sent
    
  processedAt: timestamp (optional)
    - When the email notification was sent
}
```

## Setup Steps

### 1. Firebase Configuration

**File:** `src/environments/environment.ts`

Replace the Firebase config with your actual credentials from Firebase Console:

```typescript
firebase: {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
}
```

### 2. Firestore Security Rules

Set up these security rules in Firebase Console → Firestore Database → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create contact submissions
    match /contactform/{document=**} {
      allow create;
      allow read, write: if request.auth != null;
    }
    
    // Add other collections as needed
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Enable Firestore Database

1. Go to Firebase Console
2. Navigate to Firestore Database
3. Create a new database in production mode
4. Choose your region (e.g., `nam5` for North America)

### 4. Email Notifications (Optional - Cloud Functions)

To send automatic email notifications when forms are submitted:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Authenticate: `firebase login`
3. Initialize functions: `firebase init functions`
4. Create a Cloud Function (example):

```javascript
// functions/index.js
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.onContactSubmission = functions.firestore
  .document('contactform/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    const mailOptions = {
      from: 'noreply@pringaconsultancyservices.com',
      to: 'sales@pringaconsultancyservices.com',
      subject: `New Contact Form Submission: ${data.subject || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message || 'N/A'}</p>
        <p><strong>Submitted:</strong> ${data.createdAt.toDate()}</p>
      `
    };
    
    try {
      await transporter.sendMail(mailOptions);
      await snap.ref.update({ processed: true, processedAt: new Date() });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
```

### 5. Environment Variables (Cloud Functions)

Set up environment variables for email credentials:

```bash
firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="your-app-password"
```

## Integration in Angular

### Services
- **FirestoreService** (`src/app/core/firestore.service.ts`)
  - Handles all Firestore operations
  - Initializes Firebase app
  - Provides methods to save contact submissions

### Components
- **ContactFormComponent** (`src/app/features/contact/contact-form/`)
  - Injects FirestoreService
  - On form submit, calls `firestoreService.saveContactSubmission()`
  - Displays success/error messages

## Testing

1. Fill out the contact form at `/contact`
2. Submit the form
3. Check Firebase Console → Firestore → Collections → contactform
4. New document should appear with the submitted data

## Monitoring

To monitor form submissions:

1. Go to Firebase Console
2. Navigate to Firestore Database
3. View the `contactform` collection
4. Use filters to search/sort by date, email, etc.

## Troubleshooting

### Form doesn't submit
- Check browser console for errors
- Verify Firebase config in `environment.ts`
- Ensure Firestore Database is created in Firebase Console
- Check security rules allow `create` for `/contactform`

### Email not sending
- Verify Cloud Function is deployed: `firebase deploy --only functions`
- Check Cloud Function logs in Firebase Console
- Verify Gmail app password is correct (not your regular password)
- Enable "Less secure app access" if using regular Gmail password

## Future Enhancements

1. Add reCAPTCHA to prevent spam
2. Implement form submission rate limiting
3. Add file attachments support
4. Create admin dashboard for viewing submissions
5. Implement automated follow-up emails
