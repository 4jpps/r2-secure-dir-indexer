# 📂 r2-secure-dir-indexer

**Description:**  
A Cloudflare Worker for R2 providing **token-based, scoped, and hierarchical access control** to directory listings.  
Includes file type sorting, OS-specific icons (Apple Silicon vs Intel), and clean URL handling.

---

## 📜 Source and Attribution

This project, **`r2-secure-dir-indexer`**, is based on the original Cloudflare Worker script **Listr2** by [xolyn](https://github.com/xolyn/listr2).

We have retained the original core functionality while implementing significant security, feature, and visual enhancements, including token-based scoping and OS-specific file differentiation.

**Original Project:** [https://github.com/xolyn/listr2](https://github.com/xolyn/listr2)

---

## ✨ Features

- **Token-Based Access**  
  Access is secured using URL tokens. Each token maps to a specific R2 prefix (folder) or the root.  
  *Tokens are defined as Wrangler secrets (`TOKEN_...`) and must match exactly.*

- **Dynamic Case Mapping**  
  The Worker builds a case-insensitive map of all bucket prefixes.  
  Tokens must be uppercase, but actual R2 paths may be mixed-case.  
  The Worker resolves tokens to the correct casing automatically.

- **Hierarchical Scoping**  
  A token grants access to its folder scope and all subfolders.  
  Navigation is restricted to that scope.

- **Clean URLs**  
  If a user navigates to the root of their scope, the Worker automatically redirects to a clean URL (`/?token=...`) without redundant `prefix` parameters.

- **Security Enforcement**  
  - Invalid tokens or attempts to access outside scope return a **403 Forbidden** page.  
  - **POST requests** (upload, delete, move) are blocked with **405 Method Not Allowed**.  
  - File downloads are supported via `/raw/<key>` paths.

- **Visual File Sorting**  
  Files are sorted by **extension/type first**, then by name.  
  This groups similar file types together.

- **Differentiated Icons**  
  Emoji icons distinguish file types and OS architectures:
  - 🍎 ⚙️ macOS Silicon (`-arm64.dmg`, `-arm64.pkg`)
  - 🍎 🖥️ macOS Intel (`-x64.dmg`, `-x64.pkg`)
  - 🍎 💻 macOS Universal/Unspecified
  - 🪟 Windows (`.exe`, `.msi`, `.bat`, `.cmd`)
  - 🐧 Linux (`.deb`, `.rpm`, `.sh`, `.tar`)
  - 🤖 Android (`.apk`)
  - 📃 PDF
  - 📦 Archives (`.zip`, `.rar`, `.7z`)
  - 🖼️ Images (`.jpg`, `.png`, `.gif`)
  - 📝 Docs (`.doc`, `.docx`)
  - 📄 Generic files

- **Parent Directory Navigation**  
  A `.. (Parent Directory)` link is shown when inside subfolders, respecting scope boundaries.

- **Multi-Language Support (Automatic)**
  The Worker automatically detects the user's preferred language (English, Spanish, Chinese, etc.) using the browser's **`Accept-Language` header** and renders all fixed text (headings, table columns, messages) in the corresponding language.

---

## 🚀 Setup Instructions

### 1. Cloudflare R2: API Token Creation

Create an API Token that grants the Worker permission to read the R2 bucket.

1. Go to **Cloudflare Dashboard** → **My Profile** → **API Tokens**  
2. Click **Create Token** → use **Custom Token**  
3. **Permissions:**  
   - Account → R2 Storage → **Edit** (required for case-map generation)  
4. Save and copy the token value. You’ll use this as a Wrangler secret.

---

### 2. Project Structure

Ensure your project directory contains:

- `worker.js` → Worker logic  
- `worker.toml` → Deployment configuration and R2 binding

---

### 3. Wrangler Setup

Install Wrangler and log in:

```bash
npm install -g wrangler
wrangler login
```

---

### 4. Configure Environment Secrets

Define tokens as Wrangler secrets.  
Token names are derived from folder paths: replace `/` with `_`, uppercase everything, and end with `_`.

Examples:

```bash
# Root Access Token (entire bucket)
wrangler secret put TOKEN_ A-SUPER-SECRET-ROOT-KEY

# Scoped Access Token (CLIENT/A/)
wrangler secret put TOKEN_CLIENT_A_ CLIENTA-MONTHLY-KEY
```

<!-- ✏️ Add more tokens here as needed -->

---

### 5. Configure Bindings and Environment

In `worker.toml`, bind your R2 bucket and set `ROOT` (optional) to point to a public base URL for direct file links.  
If `ROOT` is omitted, downloads use the Worker’s `/raw/<key>` route.

```toml
name = "r2-secure-dir-indexer"
main = "worker.js"
compatibility_date = "2024-01-01"

[vars]
ROOT = "https://your-public-r2-url" # optional

[[r2_buckets]]
binding = "R2"
bucket_name = "your-bucket-name"
```

<!-- ✏️ Replace bucket_name and ROOT with your actual values -->

---

### 6. Deploy the Worker

```bash
wrangler deploy
```

---

### 7. Accessing the Index

Use the Worker URL with the token as a query parameter:

- **Root Access**  
  ```
  https://your-worker.your-domain.dev/?token=A-SUPER-SECRET-ROOT-KEY
  ```

- **Scoped Access**  
  ```
  https://your-worker.your-domain.dev/?token=CLIENTA-MONTHLY-KEY
  ```

- **Direct File Downloads**  
  - If `ROOT` is set: files link to `ROOT/<key>`  
  - If `ROOT` is not set: files link to `/raw/<key>`

---

## 🧭 Behavior Notes

- **Language Detection:** The Worker reads the user's browser **`Accept-Language`** header to automatically select the display language from the supported list (currently English, Spanish, and Simplified Chinese).
- Navigating outside scope → **403 Forbidden**  
- Omitting `prefix` → Worker sets it to highest authorized scope  
- Navigating to scope root → Worker redirects to clean `/?token=...`  
- Page header shows base title + folder name; “Current Path” shows relative path
