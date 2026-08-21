> **Repository evidence:** Relocated from `desktop-app/README.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# UniERP Desktop

> Tauri 2.x desktop application — wraps all UniERP web platforms with native window management.

## Prerequisites

- Rust toolchain (install via rustup)
- Tauri CLI: `cargo install tauri-cli`
- Node.js 22+

## Development

```bash
cargo tauri dev
```

## Build

```bash
cargo tauri build
```

## Architecture

This desktop app wraps the UniERP web platforms (ports 4001–4009) in native OS windows using
Tauri 2.x. It provides:

- Native window management and system tray
- Offline-first capabilities with local storage sync
- Native file system access for import/export
- Cross-platform: Windows, macOS, Linux
- Deep OS integration (notifications, drag-and-drop, etc.)

## Licence

AGPL-3.0

