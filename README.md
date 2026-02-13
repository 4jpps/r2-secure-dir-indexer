# 📂 r2-secure-dir-indexer
**Description:** A high-performance Cloudflare Worker for R2 providing **token-based, scoped, and hierarchical access control**. Features a modern "Glassmorphism" UI, automatic multi-language detection with **localized relative timestamps**, and a **context-aware support legend**.

---

## 📜 Source and Attribution
This project is based on the original core logic of **Listr2** by [xolyn](https://github.com/xolyn/listr2). We have evolved the project into a premium, secure file-sharing portal.

**Modified By:** [Jeff Parrish PC Services](https://www.jpps.us), [Google Gemini](https://gemini.google.com), [Microsoft Copilot](https://copilot.microsoft.com), and [Claude (Anthropic)](https://www.anthropic.com/claude).

---

## ✨ Features

* **Token-Based Scoped Access** Security is managed via URL tokens (e.g., `?token=...`) mapped to environment secrets `TOKEN_...`). Tokens restrict users to a specific subdirectory "cage."

* **Localized Relative Timestamps** File modification times are displayed in user-friendly relative format ("30 minutes ago", "hace 2 días", "3天前") that automatically translates based on browser language and updates every minute.

* **Context-Aware Support Legend** The icon legend at the bottom of the page is dynamic; it only displays icons for file types actually present in the current directory, keeping the UI clean and relevant.

* **Automatic Multi-Language Detection** Detects the browser's `Accept-Language` header to serve the UI in:
  * 🇺🇸 English, 🇪🇸 Spanish, 🇨🇳 Chinese, 🇫🇷 French, 🇩🇪 German, 🇷🇺 Russian.

* **Advanced Media & OS Detection** Automatic icon mapping with **improved, instantly recognizable icons** for a wide range of support assets:
  * 🍎 **Mac Architectures:** Specific detection for Apple Silicon (ARM64) vs Intel with distinct CPU chip icons.
  * 🪟 **Installers:** Windows logo (4-pane), Linux terminal, and Android robot icons.
  * 🎬 **Media:** Video play button, audio/music notes, and image gallery icons.
  * 📄 **Documents:** PDF with embedded text label, archive with zipper design, and office documents.

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

* **Language Detection:** UI labels, dates, and relative timestamps are automatically localized based on the user's browser settings.
* **Auto-Updating Timestamps:** Relative times (e.g., "5 minutes ago") automatically update every 60 seconds without requiring a page refresh. Hover over any timestamp to see the full date/time.
* **Security:** Only `GET` requests are allowed. All management/write operations are blocked.
* **Dynamic Casing:** The worker automatically resolves mixed-case R2 paths against your uppercase token names.
* **Improved Icons:** File type icons are designed for instant recognition, using familiar symbols like the Windows logo, Android robot, play buttons, and zipper designs.

---

## 🎨 Recent Improvements

* ✅ **Fixed URL Parameter Handling** - Corrected token parameter concatenation in directory navigation
* ✅ **Added RegExp Escaping** - Secure handling of special characters in folder names
* ✅ **Localized Relative Time** - "30 minutes ago" now translates to "hace 30 minutos", "30分钟前", etc.
* ✅ **Enhanced Icons** - More recognizable and visually distinct icons for all file types
* ✅ **Live Time Updates** - Timestamps refresh automatically every minute

---

## 📋 Supported File Types & Icons

| Icon | Type | Extensions |
|------|------|------------|
| <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" stroke="none"><path d="M0,0 L10,0 L10,10 L0,10 Z M0,12 L10,12 L10,22 L0,22 Z M12,0 L22,0 L22,10 L12,10 Z M12,12 L22,12 L22,22 L12,22 Z" transform="translate(1, 1)"/></svg> | Windows | .exe, .msi |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8l3 3-3 3M12 14h4"/></svg> | Linux | .deb, .rpm, .sh |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9v8h12V9H6z"/><path d="M6 9h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M7 6l2-3M17 6l-2-3"/></svg> | Android | .apk |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><text x="12" y="14" font-size="6" text-anchor="middle" fill="currentColor" stroke="none" font-family="monospace">A</text></svg> | Mac ARM | .dmg, .pkg (with arm64/m1/m2 in filename) |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><circle cx="12" cy="12" r="3"/></svg> | Mac Intel | .dmg, .pkg (with x64/intel in filename) |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><text x="12" y="16" font-size="5" text-anchor="middle" fill="currentColor" stroke="none" font-weight="bold">PDF</text></svg> | PDF | .pdf |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="11" x2="12" y2="12"/><line x1="12" y1="13" x2="12" y2="14"/><line x1="12" y1="15" x2="12" y2="16"/><circle cx="12" cy="18" r="1"/></svg> | Archive | .zip, .7z, .rar |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg> | Documents | .doc, .docx, .txt, .rtf |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> | Images | .jpg, .png, .svg, .webp |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg> | Video | .mp4, .mkv, .mov, .avi |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> | Audio | .mp3, .wav, .flac, .m4a |
| <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> | Folder | Directories |

---

## 🌐 Supported Languages

The interface automatically adapts to the user's browser language:

- **English** (en) - Default
- **Spanish** (es) - Español
- **Chinese** (zh) - 中文
- **French** (fr) - Français
- **German** (de) - Deutsch
- **Russian** (ru) - Русский

All UI elements, including button labels, file counts, timestamps, and the support legend are fully translated.

---

## 📄 License

Based on Listr2 by xolyn. Modified and enhanced by the contributors listed above.
