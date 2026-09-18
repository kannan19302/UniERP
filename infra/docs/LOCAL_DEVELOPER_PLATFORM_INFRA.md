# Local developer-platform infrastructure

This environment supplies two development-only integration boundaries without external credentials.

## Git remote

The API repository uses the additional remote `local-preview`, backed by the ignored bare repository at `infra/var/git/unierp-api.git`. It is suitable for branch, fetch, push, and rollback tests. It does not validate GitHub-specific pull-request behavior.

## Isolated preview runtime

Start or rebuild the runtime from `infra`:

```powershell
docker compose -f docker-compose.preview.yml up -d --build
```

- Runtime URL: `http://localhost:4018`
- Health URL: `http://localhost:4018/healthz`
- Plan proxy: `GET /api/preview/:token` with the caller's bearer authorization
- Rendered App/Form or Site/Page: `GET /preview/:token` with the caller's bearer authorization
- Typed Form submission: `POST /preview/:token/submit`; the runtime forwards the canonical Form identity and values to the control plane with a deterministic idempotency key. The API revalidates the pinned composition and writes only through a bound generated-table Data Object.
- Active signed release: `GET /runtime/:environmentId/projects/:projectId`
- Active-release submission: `POST /runtime/:environmentId/projects/:projectId/submit`

The runtime does not consume editor drafts for deployed applications. It asks the control plane for the active signed release, whose source is hydrated only from exact immutable artifact revisions after manifest, signature, package, source-hash, compiled-hash, and binding verification.

The container runs as an unprivileged user with a read-only root filesystem, all capabilities dropped, bounded CPU/memory/PIDs, and no stored application credential. Stop it with `docker compose -f docker-compose.preview.yml down`; add `--rmi local` only when intentionally removing its locally built image.
