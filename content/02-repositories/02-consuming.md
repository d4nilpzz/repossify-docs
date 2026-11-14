---
title: Consuming
icon: download
description: Depend on artifacts hosted in your repository.
---

# Consuming

A public repository needs no credentials at all. Point your build at it and resolve as usual.

## Maven

```xml title="pom.xml"
<repositories>
  <repository>
    <id>repossify</id>
    <url>https://maven.example.dev/repo/releases</url>
  </repository>
</repositories>
```

```xml
<dependency>
  <groupId>com.example</groupId>
  <artifactId>my-lib</artifactId>
  <version>1.0.0</version>
</dependency>
```

## Gradle

```kotlin title="build.gradle.kts"
repositories {
    mavenCentral()
    maven { url = uri("https://maven.example.dev/repo/releases/") }
}

dependencies {
    implementation("com.example:my-lib:1.0.0")
}
```

> [!NOTE]
> Keep `mavenCentral()` unless your repository also mirrors it. Your repository only serves
> what it holds; the transitive dependencies of your own libraries still have to come from
> somewhere. [Mirrors](03-mirrors.md) covers making one URL serve both.

## Private repositories

Add a token with read permission on the path, and keep the secret outside the project:

```kotlin
repositories {
    maven {
        url = uri("https://maven.example.dev/repo/private/")
        credentials {
            username = providers.gradleProperty("repossifyUser").orNull
            password = providers.gradleProperty("repossifyToken").orNull
        }
    }
}
```

For Maven, the credentials go in `~/.m2/settings.xml` under a `<server>` whose `<id>` matches
the `<repository>` id, exactly as for publishing.

## Snapshots

Maven does not look for snapshots in a repository unless you say so:

```xml
<repository>
  <id>repossify-snapshots</id>
  <url>https://maven.example.dev/repo/snapshots</url>
  <releases><enabled>false</enabled></releases>
  <snapshots><enabled>true</enabled></snapshots>
</repository>
```

Gradle resolves whatever the version string asks for, so no extra configuration is needed
beyond adding the snapshots URL as another `maven { }` block.
