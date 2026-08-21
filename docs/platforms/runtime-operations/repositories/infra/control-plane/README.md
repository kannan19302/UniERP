> **Repository evidence:** Relocated from `infra/control-plane/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Control-plane ingress

Phase 1's third layer — `PLATFORM_ARCHITECTURE.md` § 3, § 5.1, § 10.

The control plane is separated by **four** independent mechanisms. Three are in
the application repositories and are already enforced:

1. reserved namespaces in permission matching (`hasPermission`)
2. `ControlPlaneGuard`, which asserts the boundary structurally and now also
   requires MFA on the session (§ 5.2)
3. a separate frontend deployable, `unierp-console`, on its own origin
4. **this** — restricted ingress and a separate IdP realm

## Status: applied and verified

These manifests are **applied to a live cluster** and validated against a real
API server with Traefik's CRDs loaded — not merely committed. The applied
allowlist carries `sourceRange: [10.0.0.0/8, 192.168.0.0/16]` with
`ipStrategy.depth: 1`, and the console IngressRoute binds it on
`Host(admin.unierp.internal)`.

Applying them found a defect that committing them could not: the IngressRoute
referenced a `security-headers` middleware that **did not exist**. Traefik fails
a route whose middleware is missing rather than silently dropping it, so the
console would have returned 500 at request time — a safer failure than serving
unprotected, but one that would never have surfaced from reading the tree. It is
now defined here, and `kustomization.yaml` applies the set in dependency order
so a middleware always exists before the route that references it.

The IdP realm (`idp-realm-console.json`) still needs an IdP to import it into;
that is the remaining piece of layer 4.

Recording that plainly matters: a manifest in a repository is easily mistaken
for a control in production, and this document exists so nobody makes that
mistake reading the tree.

## Files

| File                        | Purpose                                                        |
| :-------------------------- | :------------------------------------------------------------- |
| `ingress-allowlist.yaml`    | Traefik middleware — source-IP allowlist on the console origin  |
| `console-ingress.yaml`      | IngressRoute for `admin.unierp.internal`, no public DNS record  |
| `idp-realm-console.json`    | IdP realm requiring MFA, short sessions, no password-only flow  |

