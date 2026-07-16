# Bosch feedback approval setup

The official PDF remains outside `public`, `src` and the Git repository. It is stored as a private Netlify Blob and is attached to an email only after Carla explicitly approves a request.

## 1. Configure Gmail

1. Enable 2-Step Verification for `carlabarastean@gmail.com`.
2. Open Google Account > Security > App passwords.
3. Create an app password named `Portfolio Netlify`.
4. Add these variables in Netlify under Project configuration > Environment variables:

   - `GMAIL_USER` - `carlabarastean@gmail.com`
   - `GMAIL_APP_PASSWORD` - the 16-character Google app password, stored as a secret
   - `FEEDBACK_REQUEST_TO` - `carlabarastean@gmail.com`
   - `FEEDBACK_APPROVAL_SECRET` - a private random value of at least 32 characters

Generate the approval secret locally with:

```bash
openssl rand -hex 32
```

Never commit the Gmail app password or the approval secret.

## 2. Upload the private PDF once

```bash
npx netlify-cli login
npx netlify-cli link --id 8428736b-8f30-4622-bb9f-6fbbe4a582db
npx netlify-cli blobs:set bosch-feedback-private feedback-bosch.pdf --input "/Users/carlabarastean/Desktop/✨Personal✨/Acte1/FeedbackBosch.pdf"
```

The store and object names must remain exactly `bosch-feedback-private` and `feedback-bosch.pdf`.

## 3. Approval flow

1. A visitor submits their name, company, email and optional reason.
2. Gmail sends the private review link to Carla.
3. Opening the link displays the requester details but does not send the PDF.
4. Selecting `Approve and send PDF` attaches the private PDF and emails it to the requester.
5. A Blob delivery lock prevents duplicate messages if approval is submitted twice.

Approval links contain no requester details and expire after 7 days.
