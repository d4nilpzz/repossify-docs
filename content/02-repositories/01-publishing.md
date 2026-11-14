---
title: Publishing
icon: upload
description: Deploy artifacts from Maven and Gradle.
---

# Publishing

Credentials are plain HTTP Basic: the **token name** as the username, the **secret** as the
password. Both Maven and Gradle already know what to do with that.

The token needs write permission on the path you are publishing to. See
[Permissions](../03-access/02-permissions.md).

## Maven

```xml title="pom.xml"
<distributionManagement>
  <repository>
    <id>repossify</id>
    <url>https://maven.example.dev/repo/releases</url>
  </repository>
  <snapshotRepository>
    <id>repossify</id>
    <url>https://maven.example.dev/repo/snapshots</url>
  </snapshotRepository>
</distributionManagement>
```

The credentials go in `~/.m2/settings.xml`, under the same `<id>`:

```xml title="~/.m2/settings.xml"
<server>
  <id>repossify</id>
  <username>ci-bot</username>
  <password>the-token-secret</password>
</server>
```

Then `mvn deploy`.

## Gradle

```kotlin title="build.gradle.kts"
plugins {
    `java-library`
    `maven-publish`
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["java"])
        }
    }

    repositories {
        maven {
            name = "repossify"
            val base = "https://maven.example.dev/repo"
            url = uri(if (version.toString().endsWith("SNAPSHOT")) "$base/snapshots/" else "$base/releases/")
            credentials {
                username = providers.gradleProperty("repossifyUser").orNull
                password = providers.gradleProperty("repossifyToken").orNull
            }
        }
    }
}
```

Then `./gradlew publish`. The repository follows the version, so the same task reaches
snapshots while the version carries `-SNAPSHOT` and releases once it does not.

> [!CAUTION]
> Keep the secret out of the project. `~/.gradle/gradle.properties` lives outside every
> checkout, so it cannot be committed by accident:
> ```properties
> repossifyUser=ci-bot
> repossifyToken=the-token-secret
> ```
> In CI, set `REPOSSIFY_USER` and `REPOSSIFY_TOKEN` as secrets and read them with
> `providers.environmentVariable(...)` instead.

## What the responses mean

| Status | Meaning |
|---|---|
| `201` | Deployed |
| `401` | No credentials, or the secret is wrong |
| `403` | Credentials are fine, but the token has no write permission on that path |
| `409` | The version already exists and the repository refuses redeployment |
| `507` | The repository is over its storage quota |

The difference between `401` and `403` is worth remembering: `401` is about who you are,
`403` is about what you may touch. A `403` on a deploy almost always means a missing route
grant, not a bad token.
