# Pringa Consultancy Services - Firebase Deployment Guide

## Complete Setup Overview

This guide covers deploying the entire PCS website with Firebase backend (Firestore + Cloud Functions).

**Architecture:**
```
Angular Frontend (dist/) 
    ↓
Firebase Hosting (serves dist/)
    ↓
Firestore Database (stores contact submissions)
    ↓
Cloud Functions (sends emails on new submissions)
    ↓
Gmail SMTP (sends emails to sales team + user confirmation)
```

---

## Quick Start (TL;DR)

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Set email config
firebase functions:config:set gmail.email="contact@company.com" gmail.app_password="xxxx xxxx xxxx xxxx"

# 4. Install function dependencies
cd functions && npm install && cd ..

# 5. Build Angular
npm run build

# 6. Deploy everything
firebase deploy
```

---

## Detailed Setup

### Phase 1: Prerequisites

#### 1.1 Firebase Project Created

Visit [firebase.google.com](https://firebase.google.com):
1. Click "Create Project"
2. Name: "Pringa Consultancy Services" (or any name)
3. Enable Google Analytics (optional)
4. Create project

**Note:** Copy your project ID (shown in settings)

#### 1.2 Install Firebase CLI

```bash
npm install -g firebase-tools

# Verify installation
firebase --version
# Should output: x.y.z (e.g., 13.0.0)
```

#### 1.3 Generate Gmail App Password

Follow [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833):

1. Enable 2-Step Verification: [myaccount.google.com/security](https://myaccount.google.com/security)
2. Search "App passwords"
3. Select Mail → Windows Computer
4. Copy the 16-character password
5. **Save for later** - you'll need this in Phase 3

---

### Phase 2: Local Firebase Configuration

#### 2.1 Initialize Firebase in Project Root

```bash
cd D:\KARTHIK\code\Firebase\PCS

firebase init
```

When prompted:
- **Which Firebase features do you want to set up?** 
  - Select: Firestore, Functions, Hosting
- **Select default Firebase project:** 
  - Choose your project (or enter project ID)
- **What file should be used for Firestore Rules?** 
  - Press Enter (use default: `firestore.rules`)
- **What file should be used for Firestore indexes?** 
  - Press Enter (use default: `firestore.indexes.json`)
- **What language for Cloud Functions?** 
  - Select: JavaScript
- **Use ESLint?** 
  - Choose: No (to keep setup simple)
- **What do you want to use as your public directory?** 
  - Enter: `dist/pcs` (Angular build output)
- **Configure as single-page app?** 
  - Choose: Yes (important for Angular routing)

**Verification:**
```bash
# Should see these files created:
# .firebaserc (already created above)
# firebase.json (already created above)
# firestore.rules (already created above)
# firestore.indexes.json (already created above)
# functions/ directory with package.json and index.js
```

#### 2.2 Update functions/package.json

The file is already created. Verify it has:
```json
{
  "name": "pcs-contact-functions",
  "main": "index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0",
    "nodemailer": "^6.9.7"
  }
}
```

#### 2.3 Install Function Dependencies

```bash
cd functions
npm install
cd ..
```

Output should show:
```
added XXX packages in Xs
```

---

### Phase 3: Configure Email Credentials

#### 3.1 Set Gmail Configuration

Replace with YOUR email and app password:

```bash
firebase functions:config:set \
  gmail.email="sales@pringaconsultancyservices.com" \
  gmail.app_password="xxxx xxxx xxxx xxxx"
```

**Example (with real values):**
```bash
firebase functions:config:set \
  gmail.email="contact@gmail.com" \
  gmail.app_password="abcd efgh ijkl mnop"
```

#### 3.2 Verify Configuration

```bash
firebase functions:config:get
```

Should output:
```json
{
  "gmail": {
    "email": "sales@pringaconsultancyservices.com",
    "app_password": "xxxx xxxx xxxx xxxx"
  }
}
```

---

### Phase 4: Build Angular Application

```bash
npm run build
```

Expected output:
```
✔ Compiled successfully.

Initial chunk files | Names | Raw size | Estimated transfer
main.js | main | ~360 kB | ~97 kB
polyfills.js | polyfills | ~108 kB | ~33 kB
...
Lazy chunk files:
...

Build at: 2024-01-15T10:30:00.000Z
```

**Verify build output:**
```bash
ls dist/pcs
# Should show: index.html, main.js, polyfills.js, styles.js, runtime.js, ...
```

---

### Phase 5: Deploy to Firebase

#### 5.1 Login to Firebase

```bash
firebase login
```

Browser will open - authenticate with your Google account

#### 5.2 Deploy Everything

```bash
firebase deploy
```

This deploys:
- ✅ Firestore rules
- ✅ Cloud Functions
- ✅ Angular app to Hosting

Expected output:
```
=== Deploying to 'pcs-project-id' ===

i  deploying firestore, functions, hosting
i  firestore: checking firestore.rules for compilation errors...
✔  firestore: rules compiled successfully
i  functions: ensuring required API google.cloud.run.googleapis.com is enabled...
✔  functions: required API google.cloud.run.googleapis.com is enabled
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
✔  functions: required API cloudfunctions.googleapis.com is enabled
i  functions: preparing functions directory for upload...
✔  functions: functions directory uploaded successfully
i  hosting: uploading new files [1/3]
...
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/pcs-project-id/overview
Hosting URL: https://pcs-project-id.web.app
```

#### 5.3 View Your Live Website

```
Open: https://pcs-project-id.web.app
```

(Replace `pcs-project-id` with your actual Firebase project ID)

---

### Phase 6: Test the Integration

#### 6.1 Test Contact Form

1. Open your site: `https://pcs-project-id.web.app`
2. Navigate to **Contact** page
3. Fill in the form:
   - Name: "Test User"
   - Email: "your-test@gmail.com"
   - Subject: "Test Submission"
   - Message: "This is a test message"
4. Click **Send Message**

#### 6.2 Verify Firestore Submission

1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Firestore Database**
4. Click on **contactform** collection
5. You should see your test document with fields:
   - ✅ `name: "Test User"`
   - ✅ `email: "your-test@gmail.com"`
   - ✅ `processed: true`
   - ✅ `emailsSent: true`
   - ✅ `processedAt: [timestamp]`

#### 6.3 Check Emails

- **Sales team** - Check email inbox/spam for sales@pringaconsultancyservices.com
- **User confirmation** - Check your test email inbox for confirmation email
- Both should arrive within 1-2 minutes

#### 6.4 Monitor Cloud Functions

If emails don't arrive:

1. Go to **Firebase Console → Functions → Logs**
2. Look for errors like:
   - `Error: Invalid login - user name and password not accepted` → Check Gmail app password
   - `Error: connect ECONNREFUSED` → Check internet/Gmail SMTP
   - Other errors → Search error message

**To view logs directly:**
```bash
firebase functions:log
```

---

## Common Issues & Troubleshooting

### ❌ "Invalid login - user name and password not accepted"

**Problem:** Gmail password incorrect or not an App Password

**Solution:**
1. Generate new App Password: [Gmail App Passwords](https://myaccount.google.com/apppasswords)
2. Update config:
   ```bash
   firebase functions:config:set gmail.app_password="new-16-char-password"
   ```
3. Redeploy:
   ```bash
   firebase deploy --only functions
   ```

### ❌ "Cannot find module 'nodemailer'"

**Problem:** Function dependencies not installed

**Solution:**
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### ❌ "Firestore permission denied"

**Problem:** Security rules blocking form submissions

**Solution:**
1. Go to **Firebase Console → Firestore → Rules**
2. Apply this rule:
   ```javascript
   match /contactform/{document=**} {
     allow create;
   }
   ```
3. Click **Publish**

### ❌ "Website shows blank page"

**Problem:** Angular app not built or wrong output directory

**Solution:**
```bash
# Rebuild
npm run build

# Verify output directory
ls dist/pcs/index.html

# Check firebase.json has correct "public" path
cat firebase.json | grep -A 2 '"hosting"'

# Redeploy
firebase deploy --only hosting
```

### ✅ Emails in spam/junk?

**Common cause:** Gmail filters automated emails

**Solution:**
1. Add email to contacts/safe senders
2. Create filter: From `noreply@pringaconsultancyservices.com` → Always go to Inbox
3. Check Gmail forwarding rules (Settings → Forwarding and POP/IMAP)

---

## Monitoring & Maintenance

### Daily Monitoring

```bash
# View recent logs
firebase functions:log

# Or in Firebase Console:
# Dashboard → Logs tab
```

### Weekly Maintenance

```bash
# Check for unprocessed submissions
firebase firestore:query contactform --where processed==false --count
```

### Monthly

- Review Cloud Function costs in [Google Cloud Console](https://console.cloud.google.com/billing)
- Update npm packages: `npm update` and `npm update -D`

---

## Rollback / Troubleshooting

### Revert to Previous Version

```bash
# Delete current deployment (WARNING: deletes live site!)
firebase hosting:disable

# Or redeploy previous build
npm run build
firebase deploy --only hosting
```

### Clear Firestore Data (CAUTION)

```bash
# Delete all contactform submissions
firebase firestore:delete contactform --recursive
```

### Disable Cloud Functions

```bash
firebase deploy --only firestore,hosting
# (This skips functions deployment, leaving them running)
```

---

## Security Checklist

- [ ] Gmail 2-Step Verification enabled
- [ ] App Password generated (not regular password)
- [ ] Firebase project secrets stored securely (in GitHub: don't commit `.runtimeconfig.json`)
- [ ] Firestore Security Rules reviewed and published
- [ ] HTTPS enforced (Firebase Hosting does this automatically)
- [ ] CORS configured if calling API from other domains
- [ ] Environment variables don't contain secrets in commits

---

## Next Steps

1. ✅ Deploy live with this guide
2. ✅ Test contact form and email delivery
3. ⏳ Set up monitoring alerts (optional)
4. ⏳ Create admin dashboard for viewing submissions
5. ⏳ Add reCAPTCHA spam protection
6. ⏳ Configure custom domain (e.g., pringaconsultancy.com)

---

## Support Resources

| Topic | Link |
|-------|------|
| Firebase Docs | https://firebase.google.com/docs |
| Cloud Functions Guide | https://cloud.google.com/functions/docs |
| Nodemailer Docs | https://nodemailer.com |
| Gmail Support | https://support.google.com/mail |
| Angular Deployment | https://angular.io/guide/build |

---

## File Structure After Deployment

```
D:\KARTHIK\code\Firebase\PCS\
├── src/
│   ├── app/
│   │   ├── features/contact/
│   │   │   └── contact-form/  ← Form saves to Firestore
│   │   ├── core/
│   │   │   └── firestore.service.ts  ← Handles Firestore operations
│   │   └── ...
│   ├── environments/
│   │   ├── environment.ts  ← Firebase config
│   │   └── environment.prod.ts  ← Firebase config
│   └── ...
├── functions/
│   ├── index.js  ← Cloud Functions (email logic)
│   ├── package.json  ← Function dependencies
│   └── node_modules/  ← Installed packages
├── dist/pcs/  ← Built Angular app (deployed to Hosting)
│   ├── index.html
│   ├── main.js
│   └── ...
├── firebase.json  ← Firebase config
├── firestore.rules  ← Firestore Security Rules
├── .firebaserc  ← Project ID config
├── FIREBASE_SETUP.md  ← Firestore setup guide
├── CLOUD_FUNCTIONS_SETUP.md  ← Cloud Functions setup guide
└── DEPLOYMENT_GUIDE.md  ← This file
```

---

## Production Checklist

Before going live with real contact forms:

- [ ] Test all form validations (empty fields, invalid email, etc.)
- [ ] Test email delivery (check all inboxes and spam folders)
- [ ] Monitor Cloud Function logs for errors
- [ ] Verify Firestore document structure
- [ ] Set up automated backups (Firebase export to Google Cloud Storage)
- [ ] Configure monitoring alerts in Google Cloud Console
- [ ] Review analytics in Firebase Console
- [ ] Test on mobile devices
- [ ] Enable reCAPTCHA for spam prevention
- [ ] Document rollback procedures

---

**Deployment Status:** ✅ Ready to Deploy

Good luck! 🚀

