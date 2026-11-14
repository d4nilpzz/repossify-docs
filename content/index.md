---
title: Introduction
icon: book-open
description: What Repossify is, what it does, and when it is the right tool.
---

# Introduction

Repossify is a self-hosted Maven repository manager. It stores Java artifacts, serves them
over the layout Maven and Gradle already understand, and gives you control over who may read
and write each path.

It is a single jar and a single directory. No external database, no message broker, no
account anywhere.

## What it does

- Hosts **releases and snapshots**, with correct `maven-metadata.xml`, checksums and
  timestamped snapshot builds.
- **Mirrors upstream repositories**, so one URL in your build can stand in for Maven Central
  and everything else you depend on.
- **Scopes access tokens to path prefixes**, with read or write and an optional expiry.
- Serves a **web dashboard** for browsing, searching, statistics and token management, and
  the same operations over a REST API.

## When it fits

Repossify is built for the case where Maven Central is not an option and a hosted service is
more than you want to run: an internal library shared between a few projects, a plugin
distributed to a handful of servers, a build that should not leave your network.

It is not trying to be Nexus or Artifactory. There is no staging, no promotion pipeline and
no support for formats other than Maven.

## Where to go next

| If you want to | Read |
|---|---|
| Get it running | [Installation](01-getting-started/01-installation.md) |
| Deploy it properly | [Docker](01-getting-started/02-docker.md) |
| Publish your first artifact | [Publishing](02-repositories/01-publishing.md) |
| Hand a token to a CI job | [Tokens](03-access/01-tokens.md) |

> [!NOTE]
> These docs describe Repossify 1.1.0, which runs on Javalin 7 and Jetty 12 and requires
> JDK 21 or newer.
