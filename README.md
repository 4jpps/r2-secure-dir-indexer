# 📂 r2-secure-dir-indexer

**Description:** A high-performance Cloudflare Worker for R2 providing **token-based, scoped, and hierarchical access control** to directory listings. It features a modern "Glassmorphism" UI, automatic multi-language detection, and smart OS-specific file differentiation.

---

## 📜 Source and Attribution

This project, **`r2-secure-dir-indexer`**, is based on the original core logic of **Listr2** by [xolyn](https://github.com/xolyn/listr2).

We have significantly evolved the project to include a sophisticated security layer, advanced front-end styling, and expanded metadata support.

**Modified By:** [Jeff Parrish PC Services](https://www.jpps.us), [Google Gemini](https://gemini.google.com), and [Microsoft Copilot](https://copilot.microsoft.com).

---

## ✨ Features

* **Token-Based Scoped Access** Security is managed via URL tokens. Each token is mapped to a specific R2 prefix (folder). A root token (`TOKEN_`) grants access to the entire bucket, while scoped tokens (e.g., `TOKEN_CLIENT_A_`) restrict users to specific subdirectories.
* **Modern Glassmorphism UI** A sleek, translucent interface with **Light, Dark, and System mode** support. Theme preferences are persisted in the user's browser `localStorage`.
* **Automatic Multi-Language Detection** The indexer detects the browser's `Accept-Language` header to serve the interface in:
* 🇺🇸 English
* 🇪🇸 Spanish
* 🇨🇳 Chinese (Simplified)
* 🇫🇷 French
* 🇩🇪 German
* 🇷🇺 Russian


* **Dynamic Case Resolution** Environment variables are case-sensitive, but R2 paths often aren't. The worker automatically resolves authorized tokens to the correct mixed-case path in your bucket.
* **Intelligent File Icons & Architecture Detection** Beyond simple extensions, the indexer detects hardware architectures in filenames:
* **Apple Silicon (M1/M2/M3):** `-arm64`, `-apple`
* **Intel Mac:** `-x64`, `-intel`
* **Windows:** `.exe`, `.msi`
* **Linux:** `.deb`, `.rpm`, `.sh`
* **Android:** `.apk`


* **Client-Side Localization** File "Last Modified" timestamps are rendered using the user's local timezone and regional formatting.

---

## 🚀 Setup Instructions

### 1. Configure Environment Secrets

Access is granted via environment variables. Follow this naming convention:

* Start with `TOKEN_`
* Replace folder slashes `/` with underscores `_`
* End with an underscore `_`

```bash
# Full bucket access
wrangler secret put TOKEN_ "your-super-secret-root-key"

# Access restricted to /Clients/Acme/
wrangler secret put TOKEN_CLIENTS_ACME_ "acme-private-key"

```

---

### 2. Configure `wrangler.toml`

Bind your R2 bucket and set the optional `ROOT` variable. If `ROOT` is omitted, the worker serves files via a secure `/raw/` proxy route.

```toml
name = "r2-secure-dir-indexer"
main = "worker.js"
compatibility_date = "2024-01-01"

[vars]
# Optional: Point to a public R2 custom domain/URL
# ROOT = "https://cdn.example.com" 

[[r2_buckets]]
binding = "R2"
bucket_name = "your-r2-bucket-name"

```

---

### 3. Deploy

```bash
wrangler deploy

```

---

## 🧭 Behavior Notes

* **Access Denied:** Attempts to access folders above the token's scope or using an invalid token result in a localized **403 Access Denied** page.
* **Clean Navigation:** The UI automatically handles parent directory (`..`) navigation while strictly respecting the "top-level" boundary defined by the token.
* **Security:** Only `GET` requests are permitted. All `POST`, `PUT`, and `DELETE` attempts are blocked to ensure the repository remains read-only for end-users.

---

### 🛠️ Maintenance & Development

The code is fully documented with inline commentary explaining the:

1. **Language Detection Logic**
2. **Security & Scope Mapping**
3. **R2 Tree Rendering**
4. **Client-side Theme Handling**
