# Firebase Cloud Functions Setup Guide

## Overview

This guide walks through deploying Cloud Functions that automatically send email notifications when contact form submissions are received in Firestore.

**What it does:**
- Listens for new documents in the `contactform` collection
- Sends an email to `sales@pringaconsultancyservices.com` with submission details
- Sends a confirmation email to the user
- Marks submission as processed in Firestore

---

## Prerequisites

1. **Firebase CLI installed**
   ```bash
   npm install -g firebase-tools
   ```

2. **Google Cloud project set up** (created via Firebase Console)

3. **Gmail account** (for sending emails via SMTP)

4. **Firebase project initialized locally**
   ```bash
   firebase init functions
   ```

---

## Step 1: Generate Gmail App Password

Since Gmail blocks less-secure apps, you need an **App Password**:

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Search for "App passwords" in the security settings
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. **Copy this password** - you'll use it in the next step

---

## Step 2: Set Environment Variables in Firebase

Navigate to your project directory and set the Gmail credentials:

```bash
firebase functions:config:set gmail.email="your-email@gmail.com" gmail.app_password="your-16-char-password"
```

**Example:**
```bash
firebase functions:config:set gmail.email="contact@pringaconsultancyservices.com" gmail.app_password="abcd efgh ijkl mnop"
```

### Verify Configuration

View your current config:
```bash
firebase functions:config:get
```

Expected output:
```json
{
  "gmail": {
    "email": "contact@pringaconsultancyservices.com",
    "app_password": "abcd efgh ijkl mnop"
  }
}
```

---

## Step 3: Install Dependencies

Inside the `functions/` directory:

```bash
cd functions
npm install
cd ..
```

This installs:
- `firebase-admin`: Firebase backend SDK
- `firebase-functions`: Cloud Functions runtime
- `nodemailer`: Email sending library

---

## Step 4: Update index.js

The `functions/index.js` file is already provided with three functions:

1. **sendContactNotificationEmail** (Triggered on form submission)
   - Sends email to sales team
   - Sends confirmation email to user
   - Marks submission as processed

2. **resendContactEmail** (Callable function)
   - Manually resend email for a submission
   - Requires authentication

3. **processPendingSubmissions** (Scheduled, runs hourly)
   - Processes any submissions that failed to send
   - Retry mechanism

---

## Step 5: Deploy to Firebase

Deploy only the functions:

```bash
firebase deploy --only functions
```

Expected output:
```
✔  Deploy complete!

Function URL (sendContactNotificationEmail): https://us-central1-pcs-project.cloudfunctions.net/sendContactNotificationEmail
Function URL (resendContactEmail): https://us-central1-pcs-project.cloudfunctions.net/resendContactEmail
Function URL (processPendingSubmissions): https://us-central1-pcs-project.cloudfunctions.net/processPendingSubmissions
```

---

## Step 6: Update Firestore Security Rules

Go to **Firebase Console → Firestore Database → Rules** and apply:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow anyone to create contact form submissions
    match /contactform/{document=**} {
      allow create;
      allow read, write: if request.auth != null;
    }
  }
}
```

Click **Publish** to apply the rules.

---

## Step 7: Test the Integration

### Manual Testing

1. Start Angular dev server:
   ```bash
   npm start
   ```

2. Navigate to **http://localhost:4200/contact**

3. Fill in the contact form:
   - Name: "Test User"
   - Email: "your-email@example.com"
   - Subject: "Test Message"
   - Message: "This is a test submission"

4. Click **Send Message**

### Verify in Firebase Console

1. Go to **Firebase Console → Firestore Database → Data**
2. Click on the `contactform` collection
3. You should see a new document with:
   - ✅ `processed: true`
   - ✅ `emailsSent: true`
   - ✅ `processedAt: [timestamp]`

### Check Emails

- **Sales team** should receive: Email with full submission details
- **User** should receive: Confirmation email from noreply@pringaconsultancyservices.com

If emails don't arrive:
1. Check **Firebase Console → Functions → Logs** for errors
2. Verify Gmail credentials are correct
3. Check spam/junk folder
4. Ensure 2-Step Verification is enabled on Gmail account

---

## Step 8: Monitor Cloud Functions

### View Logs

```bash
firebase functions:log
```

Or in Firebase Console:
1. **Firebase Console → Functions → Logs**
2. Filter by function name or time range
3. Click on a log entry to see full details

### Common Log Messages

✅ **Success:**
```
Emails sent successfully for submission: abc123def456
```

❌ **Error:**
```
Error sending emails: Error: Invalid login - user name and password not accepted
```

---

## Firestore Document Structure

When a form is submitted, this is created in the `contactform` collection:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Website Redesign Inquiry",
  "message": "We're interested in a website redesign...",
  "createdAt": Timestamp("2024-01-15T10:30:00Z"),
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "",
  "processed": true,
  "processedAt": Timestamp("2024-01-15T10:30:15Z"),
  "emailsSent": true
}
```

---

## Troubleshooting

### ❌ "Invalid login - user name and password not accepted"

**Causes:**
- Gmail App Password is incorrect
- Regular Gmail password used instead of App Password
- 2-Step Verification not enabled on Gmail account

**Fix:**
1. Verify you're using the **16-character App Password**, not your Gmail password
2. Generate a new App Password and update config:
   ```bash
   firebase functions:config:set gmail.app_password="new-app-password"
   ```
3. Redeploy:
   ```bash
   firebase deploy --only functions
   ```

### ❌ "SMTP Error: connect ECONNREFUSED"

**Cause:** Gmail SMTP server can't be reached

**Fix:**
1. Check internet connection
2. Verify `service: 'gmail'` is correct in index.js
3. Check if Gmail is blocked by network firewall

### ❌ "Emails not being sent"

**Debugging steps:**
1. Check function logs:
   ```bash
   firebase functions:log
   ```
2. Verify Firestore document was created:
   ```bash
   firebase firestore:inspect contactform
   ```
3. Check Firestore Security Rules allow `create` on `/contactform`
4. Verify `processed` field is `true` in the document

### ✅ "Email sent but not received"

Check:
1. **Spam/Junk folder** - Gmail sometimes filters automated emails
2. **Gmail filters** - Rules may auto-organize incoming mail
3. **Email forwarding** - Check if sales@pringaconsultancyservices.com has forwarding enabled

---

## Production Checklist

- [ ] Gmail 2-Step Verification enabled
- [ ] App Password generated and stored in Firebase config
- [ ] Cloud Functions deployed successfully
- [ ] Firestore Security Rules published
- [ ] Test submission sent and confirmed delivery
- [ ] Logs monitored for errors
- [ ] Spam filter settings reviewed on sales email account

---

## Additional Features

### Scheduled Processing (Retry Logic)

The `processPendingSubmissions` function runs **every hour** to catch any submissions that failed to send:

- Checks for documents with `processed: false`
- Attempts to resend emails
- Updates `processed: true` on success

### Manual Resend

To manually resend an email for a specific submission (Angular):

```typescript
import { httpsCallable } from 'firebase/functions';

async resendEmail(docId: string) {
  const resendContactEmail = httpsCallable(this.functions, 'resendContactEmail');
  const response = await resendContactEmail({ docId });
  console.log(response.data);
}
```

---

## Cost Implications

**Firebase Pricing:**
- **Firestore:** ~$0.06 per 100K reads, ~$0.18 per 100K writes (free tier: 50K reads/writes daily)
- **Cloud Functions:** ~$0.40 per 1M invocations (free tier: 2M/month)
- **Gmail:** Free via Google account

**Estimated monthly cost for 100 form submissions:**
- ~$0.01 (negligible)

---

## Next Steps

1. ✅ Deploy Cloud Functions (this guide)
2. ✅ Test with a form submission
3. ⏳ Set up admin dashboard to view submissions
4. ⏳ Add reCAPTCHA spam prevention
5. ⏳ Create Zapier integration to send Slack/Teams notifications

---

## Support

For issues with:
- **Firebase:** Visit [firebase.google.com/support](https://firebase.google.com/support)
- **Gmail SMTP:** Check [support.google.com/mail](https://support.google.com/mail)
- **Nodemailer:** See [nodemailer.com](https://nodemailer.com)

