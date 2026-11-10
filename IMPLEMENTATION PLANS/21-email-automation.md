# Email the shop when a visit is booked

Local plan 21. One file for both issues:

- [Post a booked visit to the n8n webhook](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/51)
- [Email the shop from n8n when a visit arrives](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/52)

The branch `email-automation` exists at the same commit as Booking. Stay on Booking until the visit-dialog work is committed. Switching now would carry those uncommitted files. No code until Benji says yes.

The repo has no milestone named Demo ready for Monday calls, so these issues are not on it. Benji creates that milestone. This plan does not.

## Outcome

Book this job still confirms on the page. The site sends the visit as JSON. n8n sends two emails from the Gmail account already connected there. The shop copy goes to benji@bvratlas.com. The client copy goes to benjivelezrivera2@gmail.com. There is no sheet and no MailerLite.

## What the eight lessons showed

The course builds this on an AI agency site, not on Kramer. The form there asks for a name, an email, a GDPR checkbox, a sector, a team size, and a bottleneck. Lesson 1 is the plan. Lessons 2 through 8 build it.

1. **An introduction to the webhook.** The button is a mailto. It opens the visitor's mail app and passes the answers as the subject and body. That is the limit. The replacement is one JSON payload posted to n8n. From n8n they send the email, save the row in a table, and leave room to add more later.

2. **Webhook implementation.** There is no admin page and no database on the site. The webhook URL goes in an env var, in the local env file and on Vercel. The request is a POST. While testing, n8n uses its test URL. A submit on the live site arrives in n8n. A submit on localhost does not, because the Vite dev server does not run the Vercel function. Localhost has to call the deployed function, and that function posts to n8n. The course payload includes the name, the email, and the consent checkbox. The person who submitted is the one who later gets the email.

3. **Workflow build, Gmail.** Pin the webhook data, then add a Gmail "Send a message" node. That node needs a Google Cloud OAuth client: enable the Gmail API, create the client ID and client secret, then sign the Google account into n8n. The table is a Google Sheet named for the leads. An Edit Fields node flattens `body.field` down to `field`. A Get rows node plus an Aggregate node finds the largest id, and the next row is that number plus one, so sorting the sheet does not reuse an id. Append the row. If the sheet is formatted as a table, widen the table range or the new row lands outside it. The subject and the email body are set in an Edit Fields node at the start of the workflow, then dropped into the Gmail node. The Gmail node can send text or HTML.

4. **Tailored emails.** The body becomes an HTML letter with the person's name filled in, a short line about their sector, and a button. The Gmail node is set to HTML. A footer line offers unsubscribe, for GDPR. The finished path is: form, save the row, email the person.

5. **Domain emails with Google.** This is a Google Workspace mailbox, not website code. Start the trial, enter contact and payment details, and pick the address people will see, such as info@the domain. Prove the domain with a TXT record on the DNS host. Turn Gmail on with an MX record, priority 1, pointing at Google. Add the DKIM TXT record. The lesson uses a 2048-bit key. Alternate addresses such as contact@ and support@ are aliases on the same user, not new users. In Gmail, add the alias under Settings, Accounts, confirm the notice in the inbox, and send a test to the main inbox.

6. **MailerLite setup.** MailerLite is the other sender. The lesson uses the free tier, which includes the API, for a few hundred subscribers. A plain Gmail address cannot be the sender. Add the domain, authenticate it with the DNS host, and wait. Activation can take a while. Click the verification email MailerLite sends. Set the sender name, the sender email, the logo, and the brand colors. Turn on double opt-in for API adds. Create a group. The lesson calls it website leads.

7. **MailerLite automations.** The automation starts from scratch. The trigger is "joins this group," not a MailerLite form on the site. The n8n MailerLite node failed authorization in the lesson, so he used an HTTP Request instead. Method POST. Headers: Content-Type and Accept, both application/json, plus Authorization Bearer and the API token. The token is created under MailerLite integrations and stored on an n8n node, not in the website. The body is the email, first name, last name, and one group id copied from the group URL. Because double opt-in is on, the person also gets a "confirm this address" email. After they confirm, they show in the group, and the automation can send the template. That send can replace the Gmail node.

8. **Custom unsubscribe.** The footer link has to land somewhere. He adds an unsubscribe page on the site. The link itself is a second n8n webhook, a GET with the email in the query string. The workflow looks the subscriber up by email, then sends a PUT with status unsubscribed. The response is a redirect: status 301 and a Location header pointing at the page. The webhook must wait for the Respond to Webhook node, or the redirect fires too early. A new site route 404s until the host rewrite is fixed. The production webhook URL replaces the test URL in the env var, locally and on Vercel. If the send goes through MailerLite, MailerLite already puts an unsubscribe link in the footer, and that link is required. The lesson ends on a choice: n8n with your own emails, or MailerLite to subscribe and unsubscribe.

## What Kramer builds

Issues 51 and 52 follow lessons 1 through 4, aimed at the shop. The dialog has a phone and no email, so the message goes to the shop, not back to the homeowner. Lessons 5 through 8 stay in this file as the record of the course. They are not in the two issues.

Files when code starts: `src/components/BookingDialog.tsx` for the send after a valid submit, a small server function so the webhook URL stays off the page, and `.env.example` with an empty name only. The n8n workflow is the other half, in n8n.

## Where Benji steps in

The Gmail account is already connected in n8n. A test visit reached the workflow, and Gmail refused it: the credential needs to be reconnected. That sign-in is the step I cannot do. Google Workspace billing for bvratlas.com has also failed, so benji@bvratlas.com may not receive mail until that payment is fixed.

Do this before the Gmail node can send:

1. In Google Cloud Console, enable the Gmail API.
2. Create an OAuth client and copy the client ID and the client secret.
3. In n8n, add the Gmail credential and sign in with the account that should send. Leave the secret in n8n. It does not go in the repo, the issue, or the chat.

After that credential is connected, I can build the webhook, the sheet row, and the email node. I can also add the site POST. Both wait for a yes.

These are yours too, and only if you later want lessons 5 through 8:

- Lesson 5. The Workspace trial, the payment step, the domain TXT, the MX record, the DKIM record, and the click that confirms the send-as alias.
- Lesson 6. The MailerLite account, the domain authentication, and the verification email.
- Lesson 7. Create the API token and put it in n8n. The built-in MailerLite node failed in the lesson, so the working path is the HTTP request.
- Lesson 8. Click one test unsubscribe after the page and the second webhook exist.

## Steps

Do issue 51 first, then issue 52.

1. Add the empty env name. Put the real webhook URL only in local env and on Vercel.
2. After a valid Book this job, POST the six fields. If the POST fails, still show the confirmation.
3. Benji connects the Gmail credential in n8n.
4. n8n appends one row and emails the shop.
5. Test on the test webhook URL. Move the env var to the production URL only after that send arrives.

## Done when

- A test booking sends the six fields and the dialog still confirms.
- The shop receives one email, and the sheet has one new row.
- The webhook URL and the client secret are out of the repo and out of the issues.
- Lessons 5 through 8 are still unbuilt.

## Out

A homeowner email field, MailerLite, Google Workspace, the unsubscribe page, and any write to Supabase. Code waits until Benji says yes.
