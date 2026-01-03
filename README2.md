# 📄 README2.md: Key Differences from Original Listr2

This document highlights the major feature, security, and UI enhancements implemented in **`r2-secure-dir-indexer`** compared to the original `listr2` Worker.

---

## 🔒 Security and Access Control

| Feature | Original Listr2 | r2-secure-dir-indexer (Your Fork) | Significance |
| --- | --- | --- | --- |
| **Auth Model** | **Basic Auth:** Uses standard HTTP Basic Authentication (`USERNAME`/`PASSWORD`). | **Token-Based Auth:** Uses URL query parameters (`?token=...`) linked to environment secrets (`TOKEN_...`). | **Granular Security:** Enables sharing specific folders with specific clients without global credentials. |
| **Enforcement** | No scope enforcement. The entire bucket is navigable once logged in. | **Hierarchical Scoping:** Users are "caged" within the prefix defined by their token. They cannot navigate "up" past their root. | **Multi-Tenancy:** Safely host files for multiple different clients in one R2 bucket. |
| **Operations** | Supports `DELETE`, `UPLOAD`, and `MOVE` via `POST`. | **Read-Only Enforced:** Blocks all `POST` requests with a **405 Method Not Allowed**. | **Immutable Repo:** Prevents accidental or malicious modification of support assets. |
| **Error Handling** | Standard browser 401/403 prompts. | **Branded 403 Page:** A custom-styled, localized "Access Denied" page. | Professional feedback for expired or invalid tokens. |

---

## 🌍 Language and Internationalization

| Feature | Original Listr2 | r2-secure-dir-indexer (Your Fork) | Significance |
| --- | --- | --- | --- |
| **Language** | Hardcoded English. | **Dynamic Auto-Detection:** Detects browser `Accept-Language` header. | **Global Support:** Automatically serves UI in English, Spanish, Chinese, French, German, or Russian. |
| **Timestamps** | Server-side string. | **Client-Side Localization:** Formats dates via JavaScript `toLocaleString()`. | **Accuracy:** Timestamps match the user's local timezone and regional date format. |

---

## 🖥️ User Experience and Visuals

| Feature | Original Listr2 | r2-secure-dir-indexer (Your Fork) | Significance |
| --- | --- | --- | --- |
| **UI Design** | Basic HTML Table. | **Modern Glassmorphism:** Translucent panels, blur effects, and radial gradients. | High-end, professional appearance for client-facing support portals. |
| **Theme** | Single fixed theme. | **Dark/Light/System Mode:** Users can toggle themes; preference is saved to `localStorage`. | Accessibility and user comfort. |
| **Icons** | Simple generic emojis (`📄`, `📁`). | **SVG Architecture Icons:** Specialized icons for **Windows, Linux, Android, and Mac (ARM vs Intel)**. | **Instructive Value:** Helps users download the correct version for their specific hardware (e.g., M1 vs Intel Mac). |
| **Sorting** | Simple alphabetical. | **Type-First Sorting:** Folders first, then files grouped by extension/category. | **Scannability:** Groups all installers together, followed by PDFs, then images. |
| **Visibility** | Size/Date on hover only. | **Dedicated Columns:** Size and Modified Date are always visible in the table. | Faster comparison of file versions. |
| **Helpfulness** | No legend. | **Icon Legend:** A dedicated "Support Legend" panel explaining architecture and file type icons. | Ensures non-technical users pick the right installer. |

---

## ⚙️ Core Logic and Deployment

| Feature | Original Listr2 | r2-secure-dir-indexer (Your Fork) | Significance |
| --- | --- | --- | --- |
| **Path Casing** | Case-sensitive (requires exact match). | **Dynamic Case Mapping:** Resolves tokens to R2 paths regardless of mixed-casing in the bucket. | **Reliability:** Prevents "Folder Not Found" errors caused by inconsistent naming conventions in R2. |
| **URL Cleanup** | Long query strings. | **Automatic Redirects:** Redirects to clean `/?token=...` when at the root of an authorized scope. | **Simpler Sharing:** Cleaner links for support tickets and emails. |
| **Deployment** | Manual dashboard config. | **Wrangler Secret Workflow:** Optimized for CLI deployment and secure secret management. | **DevOps:** Better security for API keys and tokens. |

