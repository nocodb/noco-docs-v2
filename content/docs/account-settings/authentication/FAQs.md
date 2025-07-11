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