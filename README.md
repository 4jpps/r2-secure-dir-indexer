# 📂 r2-secure-dir-indexer

**Description:** A high-performance Cloudflare Worker for R2 providing **token-based, scoped, and hierarchical access control**. Features a modern "Glassmorphism" UI, automatic multi-language detection, and a **context-aware support legend**.

---

## 📜 Source and Attribution

This project is based on the original core logic of **Listr2** by [xolyn](https://github.com/xolyn/listr2). We have evolved the project into a premium, secure file-sharing portal.

**Modified By:** [Jeff Parrish PC Services](https://www.jpps.us), [Google Gemini](https://gemini.google.com), and [Microsoft Copilot](https://copilot.microsoft.com).

---

## ✨ Features

* **Token-Based Scoped Access** Security is managed via URL tokens (e.g., `?token=...`) mapped to environment secrets (`TOKEN_...`). Tokens restrict users to a specific subdirectory "cage."
* **Context-Aware Support Legend** The icon legend at the bottom of the page is dynamic; it only displays icons for file types actually present in the current directory, keeping the UI clean and relevant.
* **Automatic Multi-Language Detection** Detects the browser's `Accept-Language` header to serve the UI in:
* 🇺🇸 English, 🇪🇸 Spanish, 🇨🇳 Chinese, 🇫🇷 French, 🇩🇪 German, 🇷🇺 Russian.


* **Advanced Media & OS Detection** Automatic icon mapping for a wide range of support assets:
* 🍎 **Mac Architectures:** Specific detection for Apple Silicon (ARM64) vs Intel.
* 🪟 **Installers:** Specialized icons for Windows (.exe), Linux (.deb), and Android (.apk).
* 🎬 **Media:** Dedicated icons for Video (.mp4, .mov) and Audio (.mp3, .wav).
* 📄 **Documents:** Support for PDF and Office/Text formats.


* **Modern Glassmorphism UI** A sleek, translucent interface with **Light, Dark, and System mode** support. Theme preferences are persisted in the user's browser `localStorage`.

---

## 🚀 Setup Instructions

### 1. Configure Environment Secrets

Define tokens as Wrangler secrets. Token names are derived from folder paths: replace `/` with `_`, uppercase everything, and end with `_`.

```bash
# Root Access Token
wrangler secret put TOKEN_ "your-root-key"

# Scoped Access Token (/CLIENTS/ACME/)
wrangler secret put TOKEN_CLIENTS_ACME_ "acme-private-key"

```

### 2. Configure `wrangler.toml`

Bind your R2 bucket and set the optional `ROOT` variable for direct file links.

```toml
name = "r2-secure-dir-indexer"
main = "worker.js"
compatibility_date = "2024-01-01"

[[r2_buckets]]
binding = "R2"
bucket_name = "your-bucket-name"

```

### 3. Deploy

```bash
wrangler deploy

```

---

## 🧭 Behavior Notes

* **Language Detection:** UI labels and dates are automatically localized based on the user's browser settings.
* **Security:** Only `GET` requests are allowed. All management/write operations are blocked.
* **Dynamic Casing:** The worker automatically resolves mixed-case R2 paths against your uppercase token names.
