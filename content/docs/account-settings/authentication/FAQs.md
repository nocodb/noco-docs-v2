---
title: 'SSO FAQs'
description: 'Frequently asked questions about Single Sign-On (SSO) in NocoDB.'
icon: "helpCircle"
---

## Why do I see the error "SSO is not configured for this domain" when trying to sign in?

This error means that the email address you are using does not belong to a domain that has been verified and configured for SSO in your workspace settings. Only users with email addresses under your verified domain(s) can sign in via SSO. For example, if you've verified `example.com`, only users with emails like `user@example.com` will be allowed to sign in through the SSO page.

## How do I verify my domain for SSO?

**For NocoDB Cloud (Both Business and Enterprise Plans):**
1. **Business Plan**: Navigate to **Workspace Settings** > **Authentication** > **Domain Verification**
2. **Enterprise Plan**: Navigate to **Account Settings** > **Authentication** > **Domain Verification**
3. Add your domain (e.g., `example.com`)
4. Copy the provided TXT record from NocoDB
5. Add the TXT record to your domain's DNS settings through your domain registrar or DNS provider
6. Wait for DNS propagation (this may take a few minutes to several hours)
7. Click the verification button in NocoDB to confirm domain ownership

**For NocoDB Self-hosted/On-prem:** Domain verification is not required. You can configure SSO providers without verifying your domain via DNS.

## Do I need to verify my domain when setting up SSO (e.g., Google OAuth)?

**For NocoDB Cloud (Both Business and Enterprise Plans):** Yes. In addition to configuring Google OAuth or other SSO providers, you must also verify your domain in the SSO settings. This is done by adding your domain and verifying it by adding the provided TXT record to your DNS. Only after domain verification will users from that domain be able to sign in via SSO.

**For NocoDB Self-hosted/On-prem:** Domain verification is not required. You can configure SSO providers without verifying your domain via DNS. 

## When should I verify my domain?

Domain verification should be completed **before** configuring any SSO providers (Google OAuth, SAML, OIDC) for Cloud users (both Business and Enterprise plans). This ensures that:

1. Only users with email addresses from your verified domain can access the workspace
2. SSO providers are properly configured with domain restrictions
3. The authentication flow works correctly for your organization's users

If you try to configure SSO without domain verification, you may encounter errors or users from unverified domains may not be able to sign in.

## Why does domain verification fail even after adding the TXT record?

DNS propagation can take time to complete. After adding the TXT record to your domain's DNS settings:

- **Typical propagation time**: 5-30 minutes
- **Maximum propagation time**: Up to 24-48 hours (rare)
- **Check propagation**: Use online DNS lookup tools to verify the TXT record is visible
- **Retry verification**: If verification fails, wait a few minutes and try again

If verification continues to fail after 24 hours, double-check that the TXT record was added correctly and contact your DNS provider for assistance.

## Why do I get a redirection/callback URL or URI error when setting up SSO?

This error usually means that the Redirect URL (sometimes called Callback URL or Redirect URI) configured in your identity provider does not exactly match the one provided by NocoDB. Common reasons include:
- Typo or extra spaces in the URL/URI
- Using HTTP instead of HTTPS (or vice versa)
- Not including the full path as required
- Registering the wrong environment (e.g., using a local URL for production)
- Forgetting to update the Redirect URL after changing your NocoDB domain

**Solution:** Always copy and paste the exact Redirect URL/URI provided by NocoDB into your identity provider's configuration. Any mismatch will result in an error during authentication. 

## How do API tokens work with SSO-enabled workspaces?

When a workspace is configured to enforce Single Sign-On (SSO), API access is restricted to tokens generated through an authenticated SSO session. Please find additional details here: [API Tokens with SSO](/docs/product-docs/account-settings/api-tokens#api-token-access-with-sso-enabled-workspaces).

