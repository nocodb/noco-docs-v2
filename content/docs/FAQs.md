---
title: 'FAQs'
description: 'General FAQs'
icon: "helpCircle"
---

## How to upgrade NocoDB ?

- Please see [here](/docs/self-hosting/upgrading) 

## What is available in free version ?
- [Detailed comparison of NocoDB's generous CE compared to others is here](https://github.com/orgs/nocodb/projects/13).
- NocoDB has just one version that is free & open source.
- In it you will notice advanced features are all available for free.
    - ACL
    - Collaboration
    - Advanced Views : Form View, Gallery View & Kanban View
    - Share View
    - Embed View 
    - Password protected View
    - Automations
    - API Token Support
- And we would never move these features from free to an enterprise version of NocoDB.
- There is no limitations to number of bases, records or fields either.

 

## Is NocoDB available on the cloud?

Yes! NocoDB is currently available in technical preview.
You can simply signup by clicking [here](https://app.nocodb.com/#/signin?utm_source=OSS&utm_medium=OSS&utm_campaign=OSS&utm_content=OSS).


## Why is the feature I need not in Community Edition?
We know it can be disappointing when a feature you need isn’t available in community edition.
But before we react, let’s reflect: NocoDB community edition is empowering over 20,000 companies — for free without any cost.

In the sector of software that often takes, we choose to give. Yet, to continue serving with integrity,
some capabilities are part of our paid plans — not as a barrier, but as a way to sustain the service for all.
Should you need these features, you’re welcome to support us through the cloud or a self-hosted license.

## Scrollbar disappears, how should I make it visible always?
NocoDB follows the system settings for scrollbars. If you have configured your system to always show scrollbars, 
NocoDB will respect that setting. If you want to change this behavior, you can adjust your system settings accordingly.

![image](/img/v2/faq/system-settings-scrollbar.png)

## How to check my Base info in open source ?

- You can open `Base context menu` and click ``Copy Base Info``.

![image](/img/content/copy-proj-info.png)

You should see the similar result as below.
```
Node: **v20.15.1**
Arch: **x64**
Platform: **linux**
Docker: **true**
RootDB: **pg**
PackageVersion: **0.258.2**
```

## What are the official socials for NocoDB?

- Youtube: https://www.youtube.com/@nocodb
- Twitter: https://twitter.com/nocodb
- Discord: http://discord.nocodb.com/
- GitHub: https://github.com/nocodb/nocodb
- Community Forums: https://community.nocodb.com/
- LinkedIn: https://www.linkedin.com/company/nocodb
- Reddit: https://www.reddit.com/r/NocoDB/

## Why do I see the error "SSO is not configured for this domain" when trying to sign in?

This error means that the email address you are using does not belong to a domain that has been verified and configured for SSO in your workspace settings. Only users with email addresses under your verified domain(s) can sign in via SSO. For example, if you’ve verified `example.com`, only users with emails like `user@example.com` will be allowed to sign in through the SSO page.

## Do I need to verify my domain when setting up SSO (e.g., Google OAuth)?

Yes. In addition to configuring Google OAuth or other SSO providers, you must also verify your domain in the SSO settings. This is done by adding your domain and verifying it by adding the provided TXT record to your DNS. Only after domain verification will users from that domain be able to sign in via SSO.
