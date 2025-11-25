# 📄 README2.md: Key Differences from Original Listr2

This document highlights the major feature and security changes implemented in **`r2-secure-dir-indexer`** compared to the original `listr2` Worker.

---

## 🔒 Security and Access Control

| Original Listr2 | r2-secure-dir-indexer (Your Fork) | Significance |
| :--- | :--- | :--- |
| **Basic Auth:** Uses HTTP Basic Authentication (`USERNAME`/`PASSWORD`) for global access control. | **Token-Based Auth:** Uses URL query parameter tokens (`?token=...`) linked to environment secrets (`TOKEN_...`). | **Granular Security:** Enables specific, non-hierarchical access (e.g., token A sees only `/ClientA/` and token B sees only `/ClientB/`). |
| No scope enforcement. Once authenticated, the entire bucket is navigable. | **Hierarchical Scoping:** Access is strictly limited to the R2 prefix/folder defined by the token, preventing users from navigating outside their designated area. | **Least Privilege Principle:** Limits data exposure based on the token provided. |
| **Write Operations:** Supports `DELETE`, `UPLOAD`, and `MOVE` operations via `POST` requests. | **Read-Only Enforced:** Blocks all `POST` requests with a **405 Method Not Allowed** response. | **Prevents Misuse:** Ensures the Worker is only used for directory viewing and safe downloading. |
| Authentication failure returns standard browser prompt or simple 401/403. | **Custom 403 Page:** Returns a clean, branded **403 Forbidden** HTML page on token failure or scope violation. | Improved user experience and clear security feedback. |

---

## 🖥️ User Experience and Visuals

| Original Listr2 | r2-secure-dir-indexer (Your Fork) | Significance |
| :--- | :--- | :--- |
| **File Structure:** Simple alphabetical listing (files/folders mixed). | **File Structure:** Separates folders and files, then sorts files **primarily by extension/type**, then by name. | **Improved Scannability:** Groups similar files (e.g., all PDFs, all installers) together for faster visual searching. |
| **Icons:** Uses simple, generic icons (`📄`, `📁`). | **Differentiated Icons:** Uses rich emoji icons to classify files by type and **Operating System (OS)**. | **Instructive Value:** Quickly identifies platform-specific files (Windows, Linux, Android) and file formats. |
| No differentiation for Mac architectures. | **Mac Architecture Support:** Distinguishes between **Apple Silicon** (`🍎 ⚙️`) and **Intel** (`🍎 🖥️`) files based on file name suffixes (e.g., `-arm64`). | Critical for support environments distributing dual-platform software. |
| Access via parameter: `/?prefix=Folder/Subfolder/` | **Clean URL Handling:** Automatically redirects `/?prefix=Client/&token=X` to the cleaner `/?token=X` when at the root of a scope. | **Simpler Sharing:** Provides cleaner, shorter URLs for the primary scope access link. |
| **Statistics:** Only shows a very basic file count on hover. | **Statistics:** Shows **total file and folder counts** prominently above the file listing. | Clearer indication of directory contents at a glance. |
| **Metadata:** Modification time and file size only available on hover (via HTML `title`). | **Metadata:** File size and last modified date are displayed in **dedicated table columns**. | **Accessibility:** Data is always visible without requiring mouse interaction. |
| No explanation of the icons used. | **Icon Key/Legend:** Includes a dedicated section at the bottom explaining the meaning of all OS and file-type icons. | Ensures all users understand the file classification system. |

---

## ⚙️ Core Logic and Deployment

| Original Listr2 | r2-secure-dir-indexer (Your Fork) | Significance |
| :--- | :--- | :--- |
| Relies on exact casing for path traversal. | **Dynamic Case-Insensitive Mapping:** Recursively scans the R2 bucket once per request to build a case map (e.g., resolving `MATHEWS/` to `Mathews/`). | **Reliability:** Guarantees access regardless of the mixed-case nature of R2 paths, as long as the token name matches the uppercase path. |
| Deployment setup focuses on manual Cloudflare UI variable configuration. | **Wrangler CLI Integration:** The `README` provides step-by-step instructions using the **Wrangler CLI** for modern deployment and secure secret management. | **Developer Workflow:** Enables automated and repeatable deployment from a local environment. |
