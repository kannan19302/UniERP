> **Repository evidence:** Relocated from `infra/registry/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# UniERP package registry

Self-hosted Verdaccio. Runs as a datastore, because after the § 4.2 split that
is what it is: the layer boundaries are published artifacts, so a build depends
on this service the way it depends on Postgres.

```bash
docker compose -f registry/docker-compose.registry.yml up -d
```

## Why it is not optional

`PLATFORM_ARCHITECTURE.md` § 4.5 (M1) says "a deploy is a manifest, a rollback
is the previous manifest". That is only true if the versions a manifest pins are
still installable, which is why storage is a **named volume** rather than a
container-local directory — published tarballs must outlive the container.

## Scope reservation

`@kannan19302/*` and `@unierp/*` are served only from here and are **never proxied
upstream**. That is § 10's dependency-confusion defence: a package published
publicly under one of our scopes cannot shadow an internal one, because the
registry will not go looking for it.

## Consuming it

Each repository carries an `.npmrc` pointing at the registry. Publishing
requires an authenticated user:

```bash
npm adduser --registry http://localhost:4873/
```

In a real deployment this sits behind the same ingress and TLS as everything
else, and publish tokens are per-repo, short-lived and OIDC-federated from CI
(§ 10) rather than long-lived credentials on a developer's machine.

