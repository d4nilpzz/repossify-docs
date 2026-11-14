---
title: Reference
icon: terminal
description: The console, the API and the operational commands.
---

# Reference

- [Console](01-console.md) — every command, what it does and when you need it
- [API](https://github.com/d4nilpzz/Repossify/blob/master/API_DOCS.md) — the REST endpoints

## Status codes

The same codes mean the same things everywhere:

| Code | Meaning |
|---|---|
| `200` | Fine |
| `201` | Created or deployed |
| `204` | Done, nothing to return |
| `400` | The request is malformed — a bad UUID, an unparseable number |
| `401` | No credentials, or the secret is wrong |
| `403` | Credentials are fine, but not for this path |
| `404` | No such repository, artifact or token |
| `409` | Already exists and redeployment is refused |
| `429` | Too many failed authentication attempts from this address |
| `507` | Over the repository's storage quota |

Errors come back as JSON with the same shape throughout:

```json
{ "status": 403, "error": "Forbidden", "message": "Token 'ci-bot' has no write permission for /repo/releases/com/other" }
```
