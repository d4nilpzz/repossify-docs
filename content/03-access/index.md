---
title: Access control
icon: key-round
description: How tokens, permissions and the rate limiter work.
---

# Access control

Repossify has no user accounts. Everything is a **token**: a name and a random secret, with
either manager rights or a set of per-path grants.

## How a request is authenticated

Credentials arrive in one of three ways, and all of them end at the same token:

| Form | Used by |
|---|---|
| HTTP Basic `name:secret` | Maven, Gradle, curl |
| `Authorization: Bearer <secret>` | API clients |
| `repossify_session` cookie | the dashboard, after signing in |

Basic is the preferred form, because knowing the token name makes the database lookup exact
rather than a search by secret.

## How secrets are stored

A generated secret carries 192 bits of entropy and is stored as a bcrypt hash. It is shown
once, at creation, and cannot be recovered afterwards — only regenerated.

Alongside the hash, Repossify stores an indexed SHA-256 of the secret. That is what makes
authentication a single indexed lookup plus one bcrypt verification, rather than a bcrypt
check against every row. The hash is still what protects the stored value.

Successful authentications are cached for a short window, because a single `mvn` invocation
makes hundreds of requests and bcrypt is deliberately slow. Changing a token's permissions
drops the cache immediately.

## Pages

- [Tokens](01-tokens.md) — creating, scoping and expiring them
- [Permissions](02-permissions.md) — what a grant actually matches
