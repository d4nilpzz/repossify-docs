---
title: Configuration
icon: settings
description: configuration.json for the server, page.json for the dashboard and repositories.
---

# Configuration

Two files live in the working directory. Both are editable from the dashboard's
configuration modal, and both are plain JSON if you prefer an editor.

## configuration.json

Server settings. Command line flags win over anything here.

```json
{
  "hostname": "0.0.0.0",
  "port": 8080,
  "maxRequestSize": 150000000,
  "compression": true,
  "garbageCollectorIntervalMinutes": 60,
  "cors": { "enabled": false, "allowedOrigins": [] },
  "forwardedIp": { "enabled": false, "header": "X-Forwarded-For" },
  "rateLimit": { "enabled": true, "maxFailures": 20, "windowSeconds": 60 },
  "ssl": {
    "enabled": false,
    "port": 8443,
    "keyStore": "keystore.p12",
    "keyStorePassword": "",
    "keepHttp": true,
    "redirectToHttps": false
  }
}
```

### Request size

`maxRequestSize` caps an upload. The default is roughly 150 MB, which is generous for a jar
but not for a shaded artifact with everything inside. A deploy over the limit is rejected
before anything is written.

### Compression

Responses are gzipped, except for the types that are already compressed. Jars and zips are
excluded on purpose: compressing them again costs CPU and gains nothing.

### Rate limiting

Secret verification is deliberately slow, which is what protects a stored token but also
means an unauthenticated caller could spend your CPU at will. `rateLimit` caps how often one
address may present wrong credentials.

Only failures that actually reached verification count. Anonymous requests never do, so a
public repository serving traffic cannot push anyone towards a block. Once the budget is
spent the caller gets `429` until the window lapses.

> [!IMPORTANT]
> Behind a reverse proxy this interacts with `forwardedIp`. Without it, every request is
> attributed to the proxy and your clients share one budget.

### HTTPS

To terminate TLS in Repossify itself, put a PKCS#12 or JKS keystore in the working directory:

```json
{
  "ssl": {
    "enabled": true,
    "port": 8443,
    "keyStore": "keystore.p12",
    "keyStorePassword": "…",
    "keepHttp": true,
    "redirectToHttps": false
  }
}
```

Most deployments leave this off and let a reverse proxy handle certificates instead.

## page.json

Dashboard settings and, more importantly, the repository definitions.

```json
{
  "title": "My repository",
  "description": "Internal Java artifacts",
  "avatar_url": "/content/logo.png",
  "repositories": [
    {
      "name": "releases",
      "path": "/releases",
      "visibility": "PUBLIC",
      "redeployment": false
    }
  ]
}
```

### Repository options

| Field | Meaning |
|---|---|
| `name` | The path segment: `/repo/<name>/…` |
| `visibility` | `PUBLIC`, `HIDDEN` or `PRIVATE` |
| `redeployment` | Whether an existing version may be overwritten |
| `preserveSnapshots` | How many timestamped snapshot builds to keep |
| `quota` | Storage limit for the repository |
| `proxied` | Upstream mirrors, see [Mirrors](../02-repositories/03-mirrors.md) |

Visibility decides what an anonymous caller may do:

- **PUBLIC** — anyone may resolve and browse.
- **HIDDEN** — anyone may resolve a known path, but listing requires a token.
- **PRIVATE** — everything requires a token.

A repository that exists on disk but is not declared here is treated as private, so a stray
directory is never served by accident.

### Branding

`avatar_url` is the logo in the dashboard. Pointing it at `/content/…` keeps it in your data
volume, where it survives upgrades; the default points inside the jar and is replaced
whenever the bundled dashboard is rebuilt.
