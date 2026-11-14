---
title: Tokens
icon: key-round
description: Create, scope, expire and rotate access tokens.
---

# Tokens

A token is either a **manager**, which may do anything, or it holds **per-route grants**: a
path prefix plus read or write.

Create the narrowest thing that works. A CI job that publishes one library wants write on
`/repo/releases/<its groupId>`, not a manager token.

## From the console

```
generate_token ci-bot --expires=365
token_add_route ci-bot /repo/releases/com/example w
```

The secret is printed once. Pass `M` as the permission to make a manager instead:

```
generate_token deputy M
```

## From the API

```bash
curl -sX POST https://maven.example.dev/api/tokens \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "ci-bot",
        "description": "Publishes my-lib from CI",
        "expiresInDays": 365,
        "routes": [
          { "path": "/repo/releases/com/example", "permission": "w" }
        ]
      }'
```

The response carries the plaintext secret and a warning. It is the only time you will see it.

## Expiry

A token may carry an expiry, given in days. Zero or an absent value means it never expires.

An expired token stops authenticating immediately, including against the authentication
cache, so shortening an expiry is an instant revocation:

```
token_regenerate ci-bot
```

Expired tokens stay in the token list, marked as expired, rather than silently vanishing.
That way you can see what happened and delete or revive them deliberately:

```bash
curl -sX PUT https://maven.example.dev/api/tokens/ci-bot \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"expiresInDays": 0}'
```

> [!TIP]
> Give every CI token an expiry. Tokens end up pasted into build configuration and stay
> there for years; an expiry turns that from a permanent exposure into a dated one.

## Rotating

`token_regenerate` issues a new secret and keeps the name, the grants and the expiry. The old
secret stops working at once.

```
token_regenerate ci-bot
```

Rotate as soon as a secret has been somewhere it should not be: a chat message, a screenshot,
a log you pasted into an issue.

## The rate limiter

Wrong credentials from one address are capped. Only failures that reached verification count,
so anonymous traffic to a public repository never pushes anyone towards a block.

Once the budget is spent, that address gets `429` until the window lapses — including with
the correct secret, because the block applies to the address, not the credential.

> [!IMPORTANT]
> Behind a reverse proxy, enable `forwardedIp`. Otherwise every request is attributed to the
> proxy and all of your clients share a single budget.
