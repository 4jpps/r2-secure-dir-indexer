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
| 🪟 | Windows | .exe, .msi |
| 🐧 | Linux | .deb, .rpm, .sh |
| 🤖 | Android | .apk |
| 💻 ARM | Mac ARM (Silicon) | .dmg, .pkg (with arm64/m1/m2 in filename) |
| 💻 x64 | Mac Intel | .dmg, .pkg (with x64/intel in filename) |
| 📄 | PDF | .pdf |
| 🗜️ | Archive | .zip, .7z, .rar |
| 📝 | Documents | .doc, .docx, .txt, .rtf |
| 🖼️ | Images | .jpg, .png, .svg, .webp |
| 🎬 | Video | .mp4, .mkv, .mov, .avi |
| 🎵 | Audio | .mp3, .wav, .flac, .m4a |
| 📁 | Folder | Directories |

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
