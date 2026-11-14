---
title: Docker
icon: container
description: Deploy Repossify from the published image, and pick the right tag.
---

# Docker

The image is published to the GitHub Container Registry and is public, so no registry login
is needed.

```bash
docker run -d --name repossify \
  -p 8080:8080 \
  -v repossify-data:/data \
  ghcr.io/d4nilpzz/repossify:latest
```

Or with compose:

```yaml title="docker-compose.yml"
services:
  repossify:
    image: ghcr.io/d4nilpzz/repossify:latest
    ports:
      - "8080:8080"
    volumes:
      - repossify-data:/data
    restart: unless-stopped

volumes:
  repossify-data:
```

> [!WARNING]
> The `/data` volume is not optional. Without it, every redeploy starts from an empty
> database: no repositories, no tokens, no artifacts, and a new admin token each time.

## The first token

```bash
docker logs repossify 2>&1 | grep 'secret'
```

## Extra options

The entrypoint already sets the port and the working directory. Anything else goes through
`REPOSSIFY_OPTS`:

```yaml
environment:
  REPOSSIFY_OPTS: "--max-request-size 300000000"
```

## Tags

| Tag | What it is |
|---|---|
| `latest` | the default branch, moves on every push |
| `sha-<commit>` | one exact commit, never moves |
| `1.2.3`, `1.2` | published when a `v*` git tag is pushed |

Pin `sha-<commit>` for anything you care about. With `latest` you cannot tell what is
running, and a `docker compose pull` can change it under you without warning.

## Behind a reverse proxy

Most deployments terminate TLS somewhere in front of Repossify. When you do, tell it so:

```json title="configuration.json"
{
  "forwardedIp": { "enabled": true, "header": "X-Forwarded-For" }
}
```

Without this, every request appears to come from the proxy. That makes the access log
useless, and more importantly it means all of your clients share a single rate-limit budget,
so one misconfigured CI job can lock everybody out.

Make sure the proxy forwards WebSocket upgrades too, or the dashboard's metrics panel and
console tab will connect and then sit silent.
