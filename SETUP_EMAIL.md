# Email Form Setup Guide for Vercel

## Quick Setup with Formspree (5 minutes)

Your contact form is now configured to use Formspree, which will forward all submissions directly to **rim32277@gmail.com**.

### Steps to Complete Setup:

1. **Go to Formspree:**
   - Visit: https://formspree.io/
   - Click "Get Started" (it's free for up to 50 submissions/month)

2. **Create Account:**
   - Sign up with your email (rim32277@gmail.com)
   - Verify your email address

3. **Create a New Form:**
   - Click "New Form" or "Create Form"
   - Name it: "Marshall Adams Contact Form"
   - Set email to: **rim32277@gmail.com**
   - Click "Create Form"

4. **Get Your Form ID:**
   - After creating, you'll see a form endpoint like:
     ```
     https://formspree.io/f/xyzabc123
     ```
   - Copy the part after `/f/` (e.g., `xyzabc123`)

5. **Update Your HTML:**
   - Open `index.html`
   - Find line 188: `action="https://formspree.io/f/YOUR_FORM_ID"`
   - Replace `YOUR_FORM_ID` with your actual form ID
   - Example: `action="https://formspree.io/f/xyzabc123"`

6. **Deploy to Vercel:**
   - Push your changes to GitHub (or your git provider)
   - Vercel will automatically redeploy
   - Or manually deploy via Vercel CLI: `vercel --prod`

### That's it! 🎉

Now when someone fills out your contact form:
- ✅ Form data is sent to Formspree
- ✅ You receive an email at rim32277@gmail.com
- ✅ User sees a thank you page
- ✅ No backend code needed!

---

## Alternative: Vercel Serverless Function (More Advanced)

If you want more control or need more than 50 submissions/month, you can use a Vercel serverless function.

### Setup Steps:

1. **Create API folder:**
   ```
   landing page/
   ├── api/
   │   └── contact.js
   ├── index.html
   ├── styles.css
   └── script.js
   ```

2. **Create `api/contact.js`:**
   ```javascript
   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ message: 'Method not allowed' });
     }

     const { name, email, message } = req.body;

     // Use a service like SendGrid, Resend, or Nodemailer
     // Example with Resend:
     const response = await fetch('https://api.resend.com/emails', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         from: 'contact@yourdomain.com',
         to: 'rim32277@gmail.com',
         subject: `New Contact Form: ${name}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>
         `
       })
     });

     if (response.ok) {
       return res.status(200).json({ success: true });
     } else {
       return res.status(500).json({ error: 'Failed to send email' });
     }
   }
   ```

3. **Update form in `index.html`:**
   ```html
   <form class="contact-form fade-in" id="contactForm" action="/api/contact" method="POST">
   ```

This requires setting up an email service API key (SendGrid, Resend, etc.) in Vercel environment variables.

---

## Recommendation

**Use Formspree** - It's the easiest, most reliable solution for static sites on Vercel. No backend code, no API keys to manage, and it just works!
