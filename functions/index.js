const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Nodemailer transporter with SpaceMail SMTP
const transporter = nodemailer.createTransport({
  host: 'mail.spacemail.com',
  port: 465,
  secure: true, // SSL encryption
  auth: {
    user: functions.config().spacemail?.email || process.env.SPACEMAIL_EMAIL || 'sales@pringaconsultancyservices.com',
    pass: functions.config().spacemail?.password || process.env.SPACEMAIL_PASSWORD || 'Rishi@28'
  }
});

/**
 * Cloud Function triggered when a new contact form submission is created
 * Sends email notification to sales@pringaconsultancyservices.com
 */
exports.sendContactNotificationEmail = functions.firestore
  .document('contactform/{docId}')
  .onCreate(async (snap, context) => {
    try {
      const data = snap.data();
      const docId = context.params.docId;

      console.log('Processing contact form submission:', docId);

      // Email to sales team
      const salesMailOptions = {
        from: functions.config().spacemail?.email || 'sales@pringaconsultancyservices.com',
        to: 'sales@pringaconsultancyservices.com',
        subject: `New Contact Form Submission: ${data.subject || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f8ef7;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #e0e8f0; margin: 20px 0;">
            
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Subject:</strong> ${data.subject || 'Not provided'}</p>
            
            <h3 style="color: #333; margin-top: 20px;">Message:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #4f8ef7;">
              <p>${(data.message || 'No message provided').replace(/\n/g, '<br>')}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e8f0; margin: 20px 0;">
            <p><strong>Submitted:</strong> ${new Date(data.createdAt.toDate()).toLocaleString()}</p>
            <p><strong>Document ID:</strong> ${docId}</p>
            
            <hr style="border: none; border-top: 1px solid #e0e8f0; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              This is an automated notification. Please reply directly to ${data.email}
            </p>
          </div>
        `
      };

      // Confirmation email to user
      const userMailOptions = {
        from: functions.config().spacemail?.email || 'sales@pringaconsultancyservices.com',
        to: data.email,
        subject: 'We received your message - Pringa Consultancy Services',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f8ef7;">Thank You for Reaching Out!</h2>
            
            <p>Dear ${data.name},</p>
            
            <p>We've received your inquiry and appreciate you taking the time to contact us.</p>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #4f8ef7; margin: 20px 0;">
              <p><strong>Your Message Summary:</strong></p>
              <p><strong>Subject:</strong> ${data.subject || 'General Inquiry'}</p>
              <p><strong>Submitted:</strong> ${new Date(data.createdAt.toDate()).toLocaleString()}</p>
            </div>
            
            <p>Our team will review your message and get back to you within 1-2 business days.</p>
            
            <p>If you need immediate assistance, feel free to call us at <strong>+1 (555) 555-5555</strong></p>
            
            <p>Best regards,<br>
            <strong>Pringa Consultancy Services</strong><br>
            115 Lier Ridge, Halifax, NS B3P 0E1<br>
            Canada
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e8f0; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              Do not reply to this email. Replies will not be monitored.
            </p>
          </div>
        `
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(salesMailOptions),
        transporter.sendMail(userMailOptions)
      ]);

      // Update document to mark as processed
      await snap.ref.update({
        processed: true,
        processedAt: admin.firestore.Timestamp.now(),
        emailsSent: true
      });

      console.log('Emails sent successfully for submission:', docId);
      return { success: true, message: 'Emails sent successfully' };

    } catch (error) {
      console.error('Error sending emails:', error);
      
      // Update document to mark as failed
      try {
        await snap.ref.update({
          processed: false,
          errorMessage: error.message,
          failedAt: admin.firestore.Timestamp.now()
        });
      } catch (updateError) {
        console.error('Error updating document:', updateError);
      }

      // Don't throw - let the function complete
      return { success: false, error: error.message };
    }
  });

/**
 * Callable function to manually send emails for existing submissions
 * Usage: firebase.functions().httpsCallable('resendContactEmail')({ docId: 'xxx' })
 */
exports.resendContactEmail = functions.https.onCall(async (data, context) => {
  try {
    // Check authentication
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { docId } = data;

    if (!docId) {
      throw new functions.https.HttpsError('invalid-argument', 'Document ID is required');
    }

    // Get the submission from Firestore
    const snap = await admin.firestore().collection('contactform').doc(docId).get();

    if (!snap.exists) {
      throw new functions.https.HttpsError('not-found', 'Submission not found');
    }

    const submissionData = snap.data();

    // Resend emails (similar logic as above)
    const salesMailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: 'sales@pringaconsultancyservices.com',
      subject: `[RESENT] Contact Form: ${submissionData.subject || 'General Inquiry'}`,
      html: `<p>Resent submission - ${submissionData.name} (${submissionData.email})</p>`
    };

    await transporter.sendMail(salesMailOptions);

    return { success: true, message: 'Email resent successfully' };

  } catch (error) {
    console.error('Error in resendContactEmail:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Scheduled function to process any pending submissions
 * Runs every hour
 */
exports.processPendingSubmissions = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    try {
      const now = admin.firestore.Timestamp.now();
      const oneHourAgo = new admin.firestore.Timestamp(now.seconds - 3600, now.nanoseconds);

      // Find unprocessed submissions from the last hour
      const snapshot = await admin.firestore()
        .collection('contactform')
        .where('processed', '==', false)
        .where('createdAt', '>=', oneHourAgo)
        .limit(10)
        .get();

      console.log(`Found ${snapshot.size} unprocessed submissions`);

      // Process each submission
      const promises = snapshot.docs.map(async (doc) => {
        // Re-trigger the email sending logic
        const data = doc.data();
        const mailOptions = {
          from: process.env.GMAIL_EMAIL,
          to: 'sales@pringaconsultancyservices.com',
          subject: `Contact Form: ${data.subject || 'General Inquiry'}`,
          html: `<p>${data.name} - ${data.email}</p>`
        };

        try {
          await transporter.sendMail(mailOptions);
          await doc.ref.update({ processed: true, processedAt: now });
        } catch (error) {
          console.error(`Error processing ${doc.id}:`, error);
        }
      });

      await Promise.all(promises);
      return { processed: snapshot.size };

    } catch (error) {
      console.error('Error in processPendingSubmissions:', error);
    }
  });
