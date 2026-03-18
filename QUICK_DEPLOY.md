# 🚀 Firebase Deployment Quick Checklist

## Before You Deploy

### Prerequisites (One-time setup)
- [ ] Firebase account created at [firebase.google.com](https://firebase.google.com)
- [ ] Firebase project created (e.g., "pcs-project-id")
- [ ] Firebase CLI installed: `npm install -g firebase-tools`
- [ ] Gmail account with 2-Step Verification enabled
- [ ] Gmail App Password generated (16 characters)

---

## Deployment Steps

### Step 1: Authenticate with Firebase
```bash
firebase login
```

### Step 2: Set Email Credentials
```bash
firebase functions:config:set \
  gmail.email="sales@pringaconsultancyservices.com" \
  gmail.app_password="xxxx xxxx xxxx xxxx"
```

### Step 3: Install Function Dependencies
```bash
cd functions && npm install && cd ..
```

### Step 4: Build Angular App
```bash
npm run build
```

### Step 5: Deploy to Firebase
```bash
firebase deploy
```

### Step 6: Get Your Live URL
```bash
firebase hosting:channel:list
```

Copy the "Live URL" - that's your deployed website!

---

## After Deployment

### Test It
1. Open: `https://your-project-id.web.app/contact`
2. Submit test form
3. Check:
   - ✅ Firestore console → contactform collection has new document
   - ✅ Email received at sales@pringaconsultancyservices.com
   - ✅ Confirmation email received at your test email

### Monitor It
```bash
firebase functions:log
```

Check for any errors. If emails aren't sending, see **Troubleshooting** below.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Invalid login" | Regenerate Gmail App Password, update config |
| "Cannot find module 'nodemailer'" | Run `cd functions && npm install && cd ..` |
| Form doesn't submit | Check browser console (F12) for errors |
| Firestore permission denied | Update firestore.rules, redeploy: `firebase deploy --only firestore` |
| Blank page | Rebuild: `npm run build && firebase deploy --only hosting` |
| Emails in spam | Add to safe senders in Gmail |

---

## Commands Reference

```bash
# View project config
firebase projects:list

# View function logs (real-time)
firebase functions:log

# View config
firebase functions:config:get

# Redeploy just functions (after code changes)
firebase deploy --only functions

# Redeploy just hosting (after Angular build)
firebase deploy --only hosting

# Deploy everything
firebase deploy
```

---

## Common Deployment Errors & Fixes

### Error: "Cannot find module 'firebase-admin'"
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### Error: "project not set"
```bash
firebase init
# Select your project when prompted
firebase deploy
```

### Error: "Authentication required"
```bash
firebase logout
firebase login
firebase deploy
```

---

## Deployment Architecture

```
┌─────────────────────────┐
│   Angular App (dist/)   │
└──────────────┬──────────┘
               │
               ↓
    ┌──────────────────────┐
    │ Firebase Hosting     │
    │ (Serves Angular app) │
    └──────────────┬───────┘
                   │
      ┌────────────┼────────────┐
      ↓            ↓            ↓
┌──────────┐ ┌──────────┐ ┌──────────┐
│Firestore │ │Functions │ │Analytics │
│(Database)│ │(Email)   │ │(Tracking)│
└──────────┘ └────┬─────┘ └──────────┘
                  │
                  ↓
           ┌────────────────┐
           │  Gmail SMTP    │
           │ (Send emails)  │
           └────────────────┘
```

---

## What Gets Deployed?

✅ **Hosting** - Your Angular website
✅ **Firestore Database** - Stores contact form submissions  
✅ **Security Rules** - Protects your database
✅ **Cloud Functions** - Sends emails automatically
✅ **Indexes** - Optimizes database queries

---

## Post-Deployment Maintenance

### Weekly
```bash
# Check for errors
firebase functions:log | head -20
```

### Monthly
- Review Cloud Functions costs in [Google Cloud Console](https://console.cloud.google.com/billing)
- Test contact form submission
- Verify emails arriving at sales@pringaconsultancyservices.com

### Quarterly
- Update npm packages: `npm update && npm update -D`
- Review Firestore Security Rules
- Check Firebase quota usage

---

## Need More Info?

📖 **Full Guides:**
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete step-by-step walkthrough
- [CLOUD_FUNCTIONS_SETUP.md](CLOUD_FUNCTIONS_SETUP.md) - Detailed functions documentation
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firestore and collection structure

🔗 **External Resources:**
- [Firebase Documentation](https://firebase.google.com/docs)
- [Cloud Functions Guide](https://cloud.google.com/functions/docs)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

---

## ✅ Ready to Deploy?

1. Follow the **Deployment Steps** above
2. After Step 5, your site goes live! 🎉
3. Test using the **After Deployment** section
4. Report any issues to the **Troubleshooting** section

**Happy deploying!** 🚀

