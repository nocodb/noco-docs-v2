---
title: 'SSO FAQs'
description: 'Frequently asked questions about Single Sign-On (SSO) in NocoDB.'
icon: "helpCircle"
---

## Why do I see the error "SSO is not configured for this domain" when trying to sign in?

This error means that the email address you are using does not belong to a domain that has been verified and configured for SSO in your workspace settings. Only users with email addresses under your verified domain(s) can sign in via SSO. For example, if you’ve verified `example.com`, only users with emails like `user@example.com` will be allowed to sign in through the SSO page.

## Do I need to verify my domain when setting up SSO (e.g., Google OAuth)?

**For NocoDB Cloud:** Yes. In addition to configuring Google OAuth or other SSO providers, you must also verify your domain in the SSO settings. This is done by adding your domain and verifying it by adding the provided TXT record to your DNS. Only after domain verification will users from that domain be able to sign in via SSO.

**For NocoDB Self-hosted/On-prem:** Domain verification is not required. You can configure SSO providers without verifying your domain via DNS. 

## Why do I get a redirection/callback URL or URI error when setting up SSO?

This error usually means that the Redirect URL (sometimes called Callback URL or Redirect URI) configured in your identity provider does not exactly match the one provided by NocoDB. Common reasons include:
- Typo or extra spaces in the URL/URI
- Using HTTP instead of HTTPS (or vice versa)
- Not including the full path as required
- Registering the wrong environment (e.g., using a local URL for production)
- Forgetting to update the Redirect URL after changing your NocoDB domain

**Solution:** Always copy and paste the exact Redirect URL/URI provided by NocoDB into your identity provider's configuration. Any mismatch will result in an error during authentication. 


Here's an additional section you can append to the **SSO FAQs** page, covering API token behavior with SSO:

---

## How do API tokens work with SSO-enabled workspaces?

When a workspace is configured to enforce Single Sign-On (SSO), API access is restricted to tokens generated through an authenticated SSO session. Please find additional details here: [API Tokens with SSO](/docs/product-docs/account-settings/api-tokens#api-token-access-with-sso-enabled-workspaces).

