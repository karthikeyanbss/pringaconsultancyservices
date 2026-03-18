# Custom Domain Setup: pringaconsultancyservices.com

## Current Status
- **Firebase Hosting URL**: https://pringa-consultancy-services.web.app ✅ (Secure)
- **Custom Domain**: pringaconsultancyservices.com ⏳ (Currently unsecured on Hostinger)
- **Goal**: Point custom domain to Firebase + Enable SSL

---

## Step-by-Step Setup

### Step 1: Add Custom Domain in Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/project/pringa-consultancy-services/hosting/custom-domains)
2. Click **"Connect domain"** or **"Add custom domain"**
3. Enter: `pringaconsultancyservices.com`
4. Click **Continue**

### Step 2: Get Firebase DNS Records

Firebase will provide one of two options:

#### Option A: A Record (Most Common)
```
Type: A
Name: @ (or leave blank)
Value: 199.36.158.100
TTL: 3600
```

#### Option B: CNAME Records (Alternative)
```
Type: CNAME
Name: pringaconsultancyservices.com
Value: pringa-consultancy-services.firebaseapp.com
TTL: 3600
```

**Copy these values from Firebase Console before proceeding.**

---

### Step 3: Update DNS at Hostinger

1. **Log in to Hostinger** (https://hpanel.hostinger.com)
2. Go to **Domains** → Select `pringaconsultancyservices.com`
3. Click **DNS Records** or **Manage DNS**
4. Look for existing `A` records or `CNAME` records
5. **Delete or modify existing records** that might conflict:
   - Remove old A records pointing to Hostinger
   - Keep only the Firebase DNS record

6. **Add the Firebase DNS Record:**
   - If using **A record**: 
     - Name: `@` (or empty)
     - Type: `A`
     - Value: `199.36.158.100`
     - TTL: `3600`
   - If using **CNAME record**:
     - Name: `pringaconsultancyservices.com`
     - Type: `CNAME`
     - Value: `pringa-consultancy-services.firebaseapp.com`
     - TTL: `3600`

7. **Click Save**

---

### Step 4: Verify Domain in Firebase

1. Return to **Firebase Console** → **Hosting** → **Custom Domains**
2. Click **Verify** button next to your domain
3. Firebase will check DNS propagation

**DNS propagation timeline:**
- **Immediate**: Some DNS servers update instantly
- **1-6 hours**: Most DNS servers update
- **24 hours**: All DNS servers globally updated

---

### Step 5: SSL Certificate (Automatic)

Once verified, Firebase will **automatically provision an SSL certificate**:
- ✅ Issued by Google (Let's Encrypt)
- ✅ Free and automatic renewal
- ✅ Covers `pringaconsultancyservices.com` and `www.pringaconsultancyservices.com`
- ⏱️ **Timeline**: Usually 15 minutes to 24 hours

**Your site will then show as SECURE** 🔒

---

## Verification Checklist

After setup, verify with these URLs:

- [ ] `https://pringaconsultancyservices.com` → Redirects to Firebase, shows 🔒 secure
- [ ] `https://www.pringaconsultancyservices.com` → Also works and secure
- [ ] `https://pringa-consultancy-services.web.app` → Still works (Firebase default)
- [ ] Browser shows 🔒 padlock (no security warnings)
- [ ] Certificate is valid (click 🔒 → View certificate)

---

## Troubleshooting

### Domain Still Shows "Not Secure"
1. **Clear browser cache**: Ctrl+Shift+Delete, clear all
2. **Check DNS propagation**: https://dnschecker.org/
3. **Wait longer**: DNS can take up to 24 hours
4. **Verify A record is correct**: `199.36.158.100` (not Hostinger IP)

### DNS Record Won't Update
1. Check if Hostinger has DNS propagation delay
2. Verify you're editing the right domain zone
3. Ensure old records are completely removed
4. Wait 15-30 minutes for changes to propagate

### Certificate Not Provisioning
1. Ensure DNS verification shows ✅ in Firebase Console
2. Check Firebase Hosting → Custom Domains for status
3. Contact Firebase Support if stuck for >24 hours

---

## Current Firebase Setup

**Project**: `pringa-consultancy-services`
**Default Domain**: `pringa-consultancy-services.web.app` (stays online)
**Custom Domain**: `pringaconsultancyservices.com` (will be added)

Both domains will serve the same content after setup.

---

## Need Help?

1. **Firebase Custom Domain Docs**: https://firebase.google.com/docs/hosting/custom-domain
2. **Hostinger DNS Settings**: https://support.hostinger.com/en/articles/4623159-how-to-manage-dns-records
3. **Check DNS Propagation**: https://dnschecker.org/

---

**Timeline Summary:**
- ⏱️ Setup: 5 minutes
- ⏱️ DNS Propagation: 15 minutes to 24 hours
- ⏱️ SSL Certificate: Usually within 24 hours
- ✅ Total Time: Under 24-48 hours for full setup

Once complete, your site will be **fully secure and accessible** at `https://pringaconsultancyservices.com`! 🎉
